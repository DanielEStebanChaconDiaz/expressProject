const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  fotoPerfil: { type: String, sparse: true },
  nombreUsuario: { type: String, unique: true, required: true },
  correoElectronico: { type: String, unique: true, sparse: true },
  celular: { type: String, unique: true, sparse: true },
  contrasena: { type: String },
  sexo: { type: String },
  fechaNacimiento: { type: Date },
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
  facebookId: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  providerData: { type: mongoose.Schema.Types.Mixed }
});

UsuarioSchema.pre('validate', function(next) {
  if (!this.facebookId && !this.googleId && !this.discordId) {
    if (!this.contrasena) {
      this.invalidate('contrasena', 'La contraseña es requerida para usuarios locales');
    }
    if (!this.fechaNacimiento) {
      this.invalidate('fechaNacimiento', 'La fecha de nacimiento es requerida para usuarios locales');
    }
    if (!this.sexo) {
      this.invalidate('sexo', 'El sexo es requerido para usuarios locales');
    }
  }
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;