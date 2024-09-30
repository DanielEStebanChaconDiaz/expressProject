const UserDTO = require('../dto/usersDto');
const usuarioService = require('../services/users');

/**
 * Middleware para actualizar la sesión del usuario.
 * Verifica si el usuario está autenticado y actualiza la información del usuario en la sesión.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const updateSessionUser = async (req, res, next) => {
  // Verifica si hay un usuario autenticado o si hay un usuario en la sesión
  if (req.user || (req.session && req.session.user)) {
    // Obtiene el ID del usuario
    const userId = req.user ? req.user._id : req.session.user._id;
    try {
      // Obtiene la información del usuario desde el servicio
      const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);
      if (updatedUser) {
        // Convierte el usuario en un DTO
        const userDto = new UserDTO(updatedUser);
        // Actualiza el objeto req.user si existe
        if (req.user) {
          req.user = userDto;
        }
        // Actualiza el objeto req.session.user si existe
        if (req.session) {
          req.session.user = userDto;
        }
      }
    } catch (error) {
      console.error('Error al actualizar la sesión del usuario:', error);
    }
  }
  // Llama al siguiente middleware
  next();
};

// Exporta el middleware para su uso
module.exports = updateSessionUser;
