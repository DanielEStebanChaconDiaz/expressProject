const mongoose = require('mongoose');

// Definición del esquema para los productos
const ProductoSchema = new mongoose.Schema({
  // ID de la tienda a la que pertenece el producto (referencia al modelo Tienda)
  tiendaId: {
    type: mongoose.Schema.Types.String, // Cambiar a ObjectId si 'tiendaId' es un ObjectId
    ref: 'Tienda',
    required: true, // Campo obligatorio
    index: true // Indexar para mejorar la búsqueda
  },
  // URL de la imagen del producto
  imagen: {
    type: String,
  },
  // Nombre del producto
  nombre: {
    type: String,
    required: true, // Campo obligatorio
    index: true // Indexar para mejorar la búsqueda
  },
  // Descripción del producto
  descripcion: {
    type: String,
  },
  // Precio del producto
  precio: {
    type: Number,
    required: true, // Campo obligatorio
    index: true // Indexar para mejorar la búsqueda
  },
  // Dimensiones del producto
  dimensiones: {
    type: String,
  },
  // Disponibilidad del producto (cantidad en stock)
  disponibilidad: {
    type: Number,
    required: true, // Campo obligatorio
    min: 0, // No puede ser negativo
    index: true // Indexar para mejorar la búsqueda
  },
  // Descuento aplicado al producto
  descuento: {
    type: Number,
    default: 0, // Valor por defecto
    index: true // Indexar para mejorar la búsqueda
  },
  // Categoría del producto
  categoria: {
    type: String,
    required: true, // Campo obligatorio
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
    index: true // Indexar para mejorar la búsqueda
  },
  // Tipo del producto
  tipo: {
    type: String,
    enum: ['bordado', 'ceramica', 'joyeria', 'textiles'],
    index: true // Indexar para mejorar la búsqueda
  }
}, {
  timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  toJSON: { virtuals: true }, // Incluir virtuals al convertir a JSON
  toObject: { virtuals: true } // Incluir virtuals al convertir a objeto
});

// Indexar por categoría, tipo y precio
ProductoSchema.index({ categoria: 1, tipo: 1, precio: 1 });
// Indexar nombre y descripción para búsquedas de texto
ProductoSchema.index({ nombre: 'text', descripcion: 'text' });

// Virtual para calcular el precio con descuento
ProductoSchema.virtual('precioConDescuento').get(function () {
  return this.precio * (1 - this.descuento / 100);
});

// Método estático para búsqueda avanzada
ProductoSchema.statics.busquedaAvanzada = function (criterios) {
  return this.find(criterios).lean().exec(); // Ejecuta la búsqueda
};

// Middleware pre-save para actualizar la fecha de modificación
ProductoSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Establece la fecha de actualización
  next(); // Continúa con el siguiente middleware
});

// Indexar nombre para búsqueda de texto
ProductoSchema.index({ nombre: 'text' });

// Creación del modelo de Producto
const Producto = mongoose.model('Producto', ProductoSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Producto;
