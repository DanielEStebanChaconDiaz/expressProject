const usuarioService = require('../services/users');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await usuarioService.eliminarUsuario(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
