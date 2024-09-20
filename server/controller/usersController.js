const usuarioService = require('../services/users');
<<<<<<< HEAD
=======
const UserDTO = require('../dto/usersDto');
>>>>>>> origin/camilo

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.status(200).json(usuarios.map(usuario => new UserDTO(usuario)));
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
    res.status(200).json(new UserDTO(usuario));
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
    res.status(200).json(new UserDTO(usuarioActualizado));
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

const agregarProductoFavorito = async (req, res) => {
  try {
    const usuario = await usuarioService.agregarProductoFavorito(req.params.userId, req.body.productoId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar producto favorito', error });
  }
};

const agregarTallerFavorito = async (req, res) => {
  try {
    const usuario = await usuarioService.agregarTallerFavorito(req.params.userId, req.body.tallerId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar taller favorito', error });
  }
};

const agregarTiendaFavorita = async (req, res) => {
  try {
    const usuario = await usuarioService.agregarTiendaFavorita(req.params.userId, req.body.tiendaId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar tienda favorita', error });
  }
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