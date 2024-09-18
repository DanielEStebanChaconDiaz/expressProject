const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, unique: true, sparse: true },
  correoElectronico: { type: String, unique: true, sparse: true },
  celular: { type: String, unique: true, sparse: true },
  contrasena: { type: String },
  sexo: { type: String },
  fechaNacimiento: { type: Date },
  metodosPago: [{
    tipo: { type: String },
    detalles: { type: String }
  }],
  productosComprados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }],
  talleresSuscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
  
  // Campos para autenticación de terceros
  facebookId: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  instagramId: { type: String, unique: true, sparse: true },
  
  // Campo para almacenar el avatar del usuario
  avatarUrl: { type: String },

  // Campo para almacenar datos adicionales de proveedores de autenticación
  providerData: { type: mongoose.Schema.Types.Mixed }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema); // Modelo en singular

module.exports = Usuario;

