const mongoose = require('mongoose');

const TallerSchema = new mongoose.Schema({
  tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
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
  documental: { type: String }
});

const Taller = mongoose.model('Taller', TallerSchema);
module.exports = Taller;