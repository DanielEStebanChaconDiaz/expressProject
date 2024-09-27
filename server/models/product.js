const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  tiendaId: {
    type: mongoose.Schema.Types.String,
    ref: 'Tienda',
    required: true,
    index: true
  },
  imagen: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
    index: true
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
    index: true
  },
  dimensiones: {
    type: String,
  },
  disponibilidad: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },
  descuento: {
    type: Number,
    default: 0,
    index: true
  },
  categoria: {
    type: String,
    required: true,
    enum: [
      'Textileria', 
      'Ceramica', 
      'Joyería', 
      'Talla en Piedra', 
      'Talla en Madera', 
      'Bordado', 
      'Hojalatería', 
      'Estampado', 
      'Pintura Tradicional'
    ],
    index: true
  },
  tipo: {
    type: String,
    enum: ['bordado', 'ceramica', 'joyeria', 'textiles'],
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ProductoSchema.index({ categoria: 1, tipo: 1, precio: 1 });
ProductoSchema.index({ nombre: 'text', descripcion: 'text' });

ProductoSchema.virtual('precioConDescuento').get(function () {
  return this.precio * (1 - this.descuento / 100);
});

ProductoSchema.statics.busquedaAvanzada = function (criterios) {
  return this.find(criterios).lean().exec();
};

ProductoSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ProductoSchema.index({ nombre: 'text' });
const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
