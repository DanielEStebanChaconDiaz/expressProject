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

const agregarProductoFavorito = async (userId, productoId) => {
  return await Usuario.findByIdAndUpdate(
    userId,
    { $addToSet: { productosFavoritos: productoId } },
    { new: true }
  );
};

const agregarTallerFavorito = async (userId, tallerId) => {
  return await Usuario.findByIdAndUpdate(
    userId,
    { $addToSet: { talleresFavoritos: tallerId } },
    { new: true }
  );
};

const agregarTiendaFavorita = async (userId, tiendaId) => {
  return await Usuario.findByIdAndUpdate(
    userId,
    { $addToSet: { tiendaFavoritas: tiendaId } },
    { new: true }
  );
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarProductoFavorito,
  agregarTallerFavorito,
  agregarTiendaFavorita,
};