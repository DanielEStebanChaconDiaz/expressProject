const UserDTO = require('../dto/usersDto');
const usuarioService = require('../services/users');

const updateSessionUser = async (req, res, next) => {
  if (req.user || (req.session && req.session.user)) {
    const userId = req.user ? req.user._id : req.session.user._id;
    try {
      const updatedUser = await usuarioService.obtenerUsuarioPorId(userId);
      if (updatedUser) {
        const userDto = new UserDTO(updatedUser);
        if (req.user) {
          req.user = userDto;
        }
        if (req.session) {
          req.session.user = userDto;
        }
      }
    } catch (error) {
      console.error('Error al actualizar la sesión del usuario:', error);
    }
  }
  next();
};

module.exports = updateSessionUser;