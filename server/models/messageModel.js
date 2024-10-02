const mongoose = require('mongoose');

// Definir esquema para mensajes del chat
const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Crear el modelo de Mensaje
const Message = mongoose.model('Message', MessageSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Message;
