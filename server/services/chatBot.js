const socketIo = require('socket.io');
const readline = require('readline');

function setupChat(server) {
    const io = socketIo(server);
    
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado');

        socket.on('chat message', (msg) => {
            console.log('Mensaje recibido: ' + msg);
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
                io.emit('chat message', answer);
                promptAdminInput();
            }
        });
    }

    promptAdminInput();
}

module.exports = setupChat;
