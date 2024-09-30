const mongoose = require('mongoose');

// Definición del esquema para los usuarios
const UsuarioSchema = new mongoose.Schema({
  // URL de la foto de perfil del usuario
  fotoPerfil: { type: String, sparse: true },
  
  // Nombre de usuario (único y obligatorio)
  nombreUsuario: { type: String, unique: true, required: true },
  
  // Correo electrónico (único, puede ser opcional)
  correoElectronico: { type: String, unique: true, sparse: true },
  
  // Número de celular (único, puede ser opcional)
  celular: { type: String, unique: true, sparse: true },
  
  // Contraseña del usuario (opcional)
  contrasena: { type: String },
  
  // Sexo del usuario (opcional)
  sexo: { type: String },
  
  // Fecha de nacimiento (opcional)
  fechaNacimiento: { type: Date },
  
  // Dirección del usuario (opcional)
  direccion: { type: String },
  
  // Tipo de usuario (comprador o artesano, por defecto comprador)
  tipo: { type: String, enum: ["comprador", "artesano"], default: "comprador" },
  
  // Métodos de pago asociados al usuario
  metodosPago: [{
    tipo: { type: String },
    detalles: { type: String }
  }],
  
  // Productos comprados por el usuario
  productosComprados: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    tipo: String,
    cantidad: Number,
    precioUnitario: Number
  }],
  
  // Talleres a los que el usuario está suscrito
  talleresSuscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
  
  // Tiendas favoritas del usuario
  tiendaFavoritas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tienda' }],
  
  // Productos favoritos del usuario
  productosFavoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
  
  // Talleres favoritos del usuario
  talleresFavoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
  
  // Cupones asignados al usuario
  cuponesAsignados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }],
  
  // IDs de redes sociales (opcional)
  facebookId: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  
  // Datos del proveedor (opcional)
  providerData: { type: mongoose.Schema.Types.Mixed },
  
  // Carrito de compras del usuario
  carrito: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, default: 1 }
  }]
});

// Middleware de validación previo al guardado
UsuarioSchema.pre('validate', function(next) {
  // Validar campos para usuarios locales
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

// Creación del modelo de Usuario
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Exportación del modelo para su uso en otras partes de la aplicación
module.exports = Usuario;
