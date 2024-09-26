const Usuario = require('../models/user');

// Crear usuario
const crearUsuario = async (userData) => {
    const user = new Usuario(userData);
    await user.save();
    return user;
};

// Actualizar usuario
const actualizarUsuario = async (id, userData) => {
    const user = await Usuario.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
    return user;
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    return await Usuario.find();
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id);
};

// Eliminar usuario
const eliminarUsuario = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};

// Agregar producto favorito
const agregarProductoFavorito = async (userId, productoId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { productosFavoritos: productoId } },
        { new: true }
    );
};

// Agregar taller favorito
const agregarTallerFavorito = async (userId, tallerId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { talleresFavoritos: tallerId } },
        { new: true }
    );
};

// Agregar tienda favorita
const agregarTiendaFavorita = async (userId, tiendaId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { tiendaFavoritas: tiendaId } },
        { new: true }
    );
};

// Verificar si el nombre de usuario ya existe
const obtenerUsuarioPorNombre = async (nombreUsuario) => {
    return await Usuario.findOne({ nombreUsuario });
};

// Verificar si el correo electrónico ya existe
const obtenerUsuarioPorCorreo = async (correoElectronico) => {
    return await Usuario.findOne({ correoElectronico });
};

// Verificar si el celular ya existe
const obtenerUsuarioPorCelular = async (celular) => {
    return await Usuario.findOne({ celular });
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
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorCorreo,
    obtenerUsuarioPorCelular,
};
