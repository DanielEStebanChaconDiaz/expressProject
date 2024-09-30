const mongoose = require('mongoose');

// Definición del esquema para las tiendas
const TiendaSchema = new mongoose.Schema({
  // Nombre de la tienda
  nombre: { 
    type: String, // Tipo de dato: String
    required: true, // Campo obligatorio
    index: true // Indexar para mejorar la búsqueda
  },
  // Descripción de la tienda
  descripcion: { 
    type: String // Tipo de dato: String
  },
  // ID del artesano asociado a la tienda (referencia al modelo Usuario)
  artesanoId: { 
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato: ObjectId
    ref: 'Usuario', // Referencia al modelo Usuario
    required: true // Campo obligatorio
  },
  // URL del video promocional de la tienda
  video: { 
    type: String // Tipo de dato: String
  },
  // URL del código QR asociado a la tienda
  qr: { 
    type: String // Tipo de dato: String
  },
  // Productos asociados a la tienda (referencias al modelo Producto)
  productos: [{ 
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato: ObjectId
    ref: 'Producto' // Referencia al modelo Producto
  }],
  // URL de la imagen de la tienda
  imagen: { 
    type: String // Tipo de dato: String
  }
});

// Creación del modelo de Tienda
const Tienda = mongoose.model('Tienda', TiendaSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Tienda;
