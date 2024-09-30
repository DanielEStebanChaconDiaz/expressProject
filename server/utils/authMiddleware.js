/**
 * Middleware de autenticación
 * Verifica si el usuario está autenticado antes de permitir el acceso a rutas protegidas.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const authMiddleware = (req, res, next) => {
  // Verifica si el usuario está autenticado o si hay un usuario en la sesión
  if (req.isAuthenticated() || (req.session && req.session.user)) {
      return next(); // Permite continuar si está autenticado
  }
  // Si no está autenticado, responde con un error 401
  res.status(401).json({ message: 'No autorizado' });
};

// Exporta el middleware de autenticación
module.exports = authMiddleware;
