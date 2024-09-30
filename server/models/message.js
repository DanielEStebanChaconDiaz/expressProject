const mongoose = require('mongoose');

// Definición del esquema para los mensajes
const MensajeSchema = new mongoose.Schema({
  // ID del remitente (referencia al modelo Usuario)
  remitenteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', // Relaciona este campo con el modelo Usuario
    required: true, // Campo obligatorio
    index: true // Crea un índice para mejorar el rendimiento en consultas
  },
  // ID del receptor (referencia al modelo Usuario)
  receptorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', // Relaciona este campo con el modelo Usuario
    required: true, // Campo obligatorio
    index: true // Crea un índice para mejorar el rendimiento en consultas
  },
  // Contenido del mensaje
  contenido: { 
    type: String, 
    required: true // Campo obligatorio
  },
  // Fecha de envío del mensaje, se establece por defecto a la fecha actual
  fecha: { 
    type: Date, 
    default: Date.now, // Establece la fecha actual por defecto
    index: true // Crea un índice para mejorar el rendimiento en consultas
  }
});

// Creación de un índice compuesto para optimizar las búsquedas
MensajeSchema.index({ remitenteId: 1, receptorId: 1, fecha: -1 });

// Definición del modelo de Mensaje
const Mensaje = mongoose.model('Mensaje', MensajeSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Mensaje;
