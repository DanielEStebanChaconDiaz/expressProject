const Usuario = require('../models/user');

const crearUsuario = async (userData) => {
    const user = new Usuario(userData);
    await user.save();
    return user;
};

const actualizarUsuario = async (id, userData) => {
    const user = await Usuario.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
    return user;
};

const obtenerUsuarios = async () => {
    return await Usuario.find();
};

const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id);
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
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario,
    agregarProductoFavorito,
    agregarTallerFavorito,
    agregarTiendaFavorita,
};