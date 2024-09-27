const readline = require('readline');

function setupChat(io) {
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado');

        socket.on('chat message', (msg) => {
            console.log('Mensaje recibido: ' + msg);
            // Emitir el mensaje a todos los clientes incluyendo el ID del remitente
            io.emit('chat message', { text: msg, userId: socket.id }); // Asegúrate de que los mensajes de los usuarios tengan su ID
        });
    });

    // Función para que el administrador envíe mensajes desde la consola
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptAdminInput() {
        rl.question('Escribe tu respuesta (o "salir" para cerrar): ', (answer) => {
            if (answer.toLowerCase() === 'salir') {
                rl.close();
                process.exit(0);
            } else {
                io.emit('chat message', { text: answer, userId: 'admin' }); // Enviar como mensaje de admin
                promptAdminInput();
            }
        });
    }

    promptAdminInput();
}

module.exports = setupChat;
