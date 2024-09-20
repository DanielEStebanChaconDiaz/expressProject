const mongoose = require('mongoose');

const CuponSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true, index: true },
  descuento: { type: Number, required: true },
  tipo: { type: String, enum: ['general', 'asignado'], required: true },
  fechaExpiracion: { type: Date, index: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', index: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', index: true },
  tallerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Taller', index: true }
});

CuponSchema.index({ fechaExpiracion: 1, tipo: 1 });

const Cupon = mongoose.model('Cupon', CuponSchema);
module.exports = Cupon;