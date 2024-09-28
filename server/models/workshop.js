const mongoose = require('mongoose');

const TallerSchema = new mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  descripcion: { type: String },
  publicoObjetivo: { type: String },
  duracion: { type: Number },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  horario: { type: String },
  materiales: [String],
  modalidad: { type: String, enum: ['presencial', 'virtual'], required: true },
  lugar: { type: String },
  documental: { type: String },
  imagen: { type: String },
  video: { type: String}
});

TallerSchema.index({ nombre: 'text' });
const Taller = mongoose.model('Taller', TallerSchema);
module.exports = Taller;