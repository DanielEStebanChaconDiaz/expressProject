// Importar el módulo 'readline' para manejar la entrada de la consola
const readline = require('readline');
// Importar el modelo de mensaje para interactuar con la base de datos
const Message = require('../models/messageModel');

/**
 * Configura el sistema de chat utilizando sockets.
 * @param {Object} io - La instancia de socket.io para manejar conexiones.
 */
function setupChat(io) {
    // Escuchar las conexiones de clientes
    io.on('connection', async (socket) => {
        console.log('Un cliente se ha conectado');

        // Manejar la solicitud de mensajes previos
        socket.on('get previous messages', async () => {
            try {
                // Obtener los mensajes previos desde la base de datos, ordenados por timestamp
                const previousMessages = await Message.find().sort({ timestamp: 1 }).exec();
                // Emitir los mensajes previos al cliente que lo solicitó
                socket.emit('previous messages', previousMessages);
            } catch (error) {
                console.error('Error al cargar mensajes previos:', error);
            }
        });

        // Manejar el evento de recepción de un nuevo mensaje del chat
        socket.on('chat message', async (msg) => {
            console.log('Mensaje recibido:', msg);

            // Crear un nuevo mensaje y guardarlo en la base de datos
            const message = new Message({ text: msg, userId: socket.id });
            try {
                await message.save();
            } catch (error) {
                console.error('Error al guardar el mensaje:', error);
            }

            // Emitir el mensaje a todos los clientes conectados
            io.emit('chat message', { text: msg, userId: socket.id });
        });
    });

    // Configuración para permitir que el administrador envíe mensajes desde la consola
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    /**
     * Solicita la entrada del administrador a través de la consola.
     */
    function promptAdminInput() {
        rl.question('Escribe tu respuesta (o "salir" para cerrar): ', async (answer) => {
            if (answer.toLowerCase() === 'salir') {
                // Cierra la interfaz de readline y termina el proceso si el admin escribe "salir"
                rl.close();
                process.exit(0);
            } else {
                // Guardar el mensaje del administrador en la base de datos
                const adminMessage = new Message({ text: answer, userId: 'admin' });
                try {
                    await adminMessage.save();
                } catch (error) {
                    console.error('Error al guardar el mensaje del administrador:', error);
                }

                // Emitir el mensaje como un mensaje de administrador a todos los clientes
                io.emit('chat message', { text: answer, userId: 'admin' });
                promptAdminInput(); // Volver a preguntar por más entradas del administrador
            }
        });
    }

    // Iniciar la entrada del administrador
    promptAdminInput();
}

// Exportar la función de configuración del chat
module.exports = setupChat;
