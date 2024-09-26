const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({
  remitenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
  receptorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now, index: true }
});

MensajeSchema.index({ remitenteId: 1, receptorId: 1, fecha: -1 });

const Mensaje = mongoose.model('Mensaje', MensajeSchema);
module.exports = Mensaje;