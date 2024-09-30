const mongoose = require('mongoose');

// Definición del esquema para los pedidos
const PedidoSchema = new mongoose.Schema({
  // ID del usuario que realiza el pedido (referencia al modelo Usuario)
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', // Relaciona este campo con el modelo Usuario
    required: true // Campo obligatorio
  },
  // Array de productos en el pedido
  productos: [{
    // ID del producto (referencia al modelo Producto)
    productoId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Producto', // Relaciona este campo con el modelo Producto
      required: true // Campo obligatorio
    },
    // Cantidad del producto
    cantidad: { 
      type: Number, 
      required: true // Campo obligatorio
    },
    // Precio del producto en el momento del pedido
    precio: { 
      type: Number, 
      required: true // Campo obligatorio
    }
  }],
  // Total del pedido
  total: { 
    type: Number, 
    required: true // Campo obligatorio
  },
  // Fecha en la que se realizó el pedido, se establece por defecto a la fecha actual
  fecha: { 
    type: Date, 
    default: Date.now // Establece la fecha actual por defecto
  },
  // Estado del pedido, puede ser 'pendiente', 'enviado' o 'entregado'
  estado: { 
    type: String, 
    enum: ['pendiente', 'enviado', 'entregado'], // Valores permitidos
    default: 'pendiente' // Estado por defecto
  },
  // ID del cupón aplicado (referencia al modelo Cupon)
  cuponAplicado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cupon' // Relaciona este campo con el modelo Cupon
  }
});

// Definición del modelo de Pedido
const Pedido = mongoose.model('Pedido', PedidoSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Pedido;
