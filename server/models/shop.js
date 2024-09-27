const mongoose = require('mongoose');

const TiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  descripcion: { type: String },
  artesanoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  video: { type: String },
  qr: { type: String },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
  imagen: { type: String }
});

const Tienda = mongoose.model('Tienda', TiendaSchema);
module.exports = Tienda;