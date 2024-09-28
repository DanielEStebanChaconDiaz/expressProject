const mongoose = require('mongoose');

const CuponSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true, index: true },
  descuento: { type: Number, required: true },
  tipo: { type: String, enum: ['porcentaje', '2x1'], required: true },
  fechaExpiracion: { type: Date, index: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', index: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', index: true },
  tallerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Taller', index: true }
});

CuponSchema.pre('validate', function(next) {
  if (!this.productoId && !this.tallerId) {
    next(new Error('El cupón debe estar asignado a un taller o a un producto.'));
  } else {
    next();
  }
});

CuponSchema.index({ fechaExpiracion: 1, tipo: 1 });

const Cupon = mongoose.model('Cupon', CuponSchema);
module.exports = Cupon;
