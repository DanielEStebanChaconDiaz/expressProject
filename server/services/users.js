const Usuario = require('../models/user');

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} userData - Objeto con la información del usuario.
 * @returns {Promise<Object>} - Devuelve el usuario creado.
 */
const crearUsuario = async (userData) => {
    const user = new Usuario(userData);
    await user.save();
    return user;
};

/**
 * Actualiza un usuario existente por su ID.
 * @param {String} id - Identificador único del usuario.
 * @param {Object} userData - Objeto con los datos actualizados del usuario.
 * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no existe.
 */
const actualizarUsuario = async (id, userData) => {
    const user = await Usuario.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
    return user;
};

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns {Promise<Array>} - Devuelve un array de usuarios.
 */
const obtenerUsuarios = async () => {
    return await Usuario.find();
};

/**
 * Obtiene un usuario específico por su ID.
 * @param {String} id - Identificador único del usuario.
 * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
 */
const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id);
};

/**
 * Elimina un usuario específico por su ID.
 * @param {String} id - Identificador único del usuario.
 * @returns {Promise<Object|null>} - Devuelve el usuario eliminado o null si no existe.
 */
const eliminarUsuario = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};

/**
 * Agrega un producto a la lista de favoritos de un usuario.
 * @param {String} userId - ID del usuario.
 * @param {String} productoId - ID del producto a agregar a favoritos.
 * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no existe.
 */
const agregarProductoFavorito = async (userId, productoId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { productosFavoritos: productoId } },
        { new: true }
    );
};

/**
 * Agrega un taller a la lista de favoritos de un usuario.
 * @param {String} userId - ID del usuario.
 * @param {String} tallerId - ID del taller a agregar a favoritos.
 * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no existe.
 */
const agregarTallerFavorito = async (userId, tallerId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { talleresFavoritos: tallerId } },
        { new: true }
    );
};

/**
 * Agrega una tienda a la lista de favoritas de un usuario.
 * @param {String} userId - ID del usuario.
 * @param {String} tiendaId - ID de la tienda a agregar a favoritos.
 * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no existe.
 */
const agregarTiendaFavorita = async (userId, tiendaId) => {
    return await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { tiendaFavoritas: tiendaId } },
        { new: true }
    );
};

/**
 * Verifica si el nombre de usuario ya existe.
 * @param {String} nombreUsuario - Nombre de usuario a verificar.
 * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
 */
const obtenerUsuarioPorNombre = async (nombreUsuario) => {
    return await Usuario.findOne({ nombreUsuario });
};

/**
 * Verifica si el correo electrónico ya existe.
 * @param {String} correoElectronico - Correo electrónico a verificar.
 * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
 */
const obtenerUsuarioPorCorreo = async (correoElectronico) => {
    return await Usuario.findOne({ correoElectronico });
};

/**
 * Verifica si el celular ya existe.
 * @param {String} celular - Número de celular a verificar.
 * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
 */
const obtenerUsuarioPorCelular = async (celular) => {
    return await Usuario.findOne({ celular });
};

const eliminarListaDeFavoritos = async (usuarioId) => {
    try {
        return await Usuario.findByIdAndUpdate(
            usuarioId,
            { productosFavoritos: [] },
            { new: true } 
        );
    } catch (error) {
        console.error('Error al eliminar la lista de favoritos:', error);
        throw error; 
    }
};

// Exporta las funciones de manejo de usuarios
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
    eliminarListaDeFavoritos
};