const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  fotoPerfil: { type: String, sparse: true },
  nombreUsuario: { type: String, unique: true, required: true },
  correoElectronico: { type: String, unique: true, sparse: true },
  celular: { type: String, unique: true, sparse: true },
  contrasena: { type: String, required: true },
  sexo: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  direccion: { type: String },
  tipo: { type: String, enum: ["comprador", "artesano"], default: "comprador" },
  metodosPago: [{
    tipo: { type: String },
    detalles: { type: String }
  }],
  productosComprados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],
  talleresSuscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
  tiendaFavoritas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tienda' }],
  productosFavoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
  talleresFavoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
  cuponesAsignados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }],

  // Campos para autenticación de terceros
  facebookId: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  providerData: { type: mongoose.Schema.Types.Mixed }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;