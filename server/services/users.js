const Usuario = require('../models/user');

const obtenerUsuarios = async () => {
  return await Usuario.find();
};

const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id);
};

const actualizarUsuario = async (id, datos) => {
  return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
