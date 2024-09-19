const Usuario = require('../models/user');

// Buscar todos los usuarios
const obtenerUsuarios = async () => {
  return await Usuario.find();
};

// Buscar usuario por ID
const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id);
};

// Actualizar usuario
const actualizarUsuario = async (id, datos) => {
  return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};

// Eliminar usuario
const eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
