const bcrypt = require('bcrypt');
const usuarioService = require('../services/users');
const UserDTO = require('../dto/usersDto');
const { uploadToCloudinary } = require('../config/cloudinaryConfig');

exports.registerUser = async (req, res) => {
    const { nombreUsuario, correoElectronico, contrasena, sexo, fechaNacimiento, tipo } = req.body;

    try {
        // Verificaciones existentes...

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await usuarioService.crearUsuario({
            nombreUsuario,
            correoElectronico,
            contrasena: hashedPassword,
            sexo,
            fechaNacimiento,
            tipo
        });

        const userDto = new UserDTO(user);
        req.session.user = userDto;

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            user: userDto
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
};

exports.registerUserByPhone = async (req, res) => {
    const { nombreUsuario, celular, contrasena, sexo, fechaNacimiento, tipo } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await usuarioService.crearUsuario({
            nombreUsuario,
            celular,
            contrasena: hashedPassword,
            sexo,
            fechaNacimiento,
            tipo
        });

        const userDto = new UserDTO(user);
        req.session.user = userDto;

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            user: userDto
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.status(200).json(usuarios.map(usuario => new UserDTO(usuario)));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(new UserDTO(usuario));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
    }
};

exports.actualizarFotoPerfil = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
      }
  
      const uploadResult = await uploadToCloudinary(req.file);
      const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, { fotoPerfil: uploadResult.secure_url });
      
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.status(200).json(new UserDTO(usuarioActualizado));
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la foto de perfil', error: error.message });
    }
  };

exports.actualizarUsuario = async (req, res) => {
    try {
      let datosActualizacion = req.body;
      
      if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file);
        datosActualizacion.fotoPerfil = uploadResult.secure_url;
      }
  
      const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, datosActualizacion);
      
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      
      res.status(200).json(new UserDTO(usuarioActualizado));
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await usuarioService.eliminarUsuario(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
    }
};

exports.agregarProductoFavorito = async (req, res) => {
    try {
        const usuario = await usuarioService.agregarProductoFavorito(req.params.userId, req.body.productoId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(new UserDTO(usuario));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar producto favorito', error: error.message });
    }
};

exports.agregarTallerFavorito = async (req, res) => {
    try {
        const usuario = await usuarioService.agregarTallerFavorito(req.params.userId, req.body.tallerId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(new UserDTO(usuario));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar taller favorito', error: error.message });
    }
};

exports.agregarTiendaFavorita = async (req, res) => {
    try {
        const usuario = await usuarioService.agregarTiendaFavorita(req.params.userId, req.body.tiendaId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(new UserDTO(usuario));
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar tienda favorita', error: error.message });
    }
};

exports.obtenerUsuarioLogueado = (req, res) => {
    console.log('Session:', req.session);
    console.log('Is authenticated:', req.isAuthenticated());
    console.log('User:', req.user);
    console.log('Passport:', req._passport);
  
    let user;
  
    if (req.isAuthenticated && req.isAuthenticated()) {
      user = req.user;
    } 
    else if (req.session && req.session.user) {
      user = req.session.user;
    }
  
    if (!user) {
      return res.status(401).json({
        mensaje: 'No autorizado',
        debug: {
          session: req.session,
          isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
          user: req.user,
          passport: req._passport
        }
      });
    }
  
    res.status(200).json(new UserDTO(user));
  };

  exports.logout = (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
      });
    }
  
    if (req.logout) {
      req.logout((err) => {
        if (err) {
          console.error('Error during Passport logout:', err);
        }
      });
    }
  
    res.clearCookie('connect.sid');
  
    res.status(200).json({ message: 'Logout successful' });
  };
  
  exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = await usuarioService.obtenerUsuarioPorNombre(identifier);
        if (!user) {
            user = await usuarioService.obtenerUsuarioPorCorreo(identifier);
        }
        if (!user) {
            user = await usuarioService.obtenerUsuarioPorCelular(identifier);
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        req.session.user = new UserDTO(user);

        res.status(200).json({ 
            success: true,
            message: 'Inicio de sesión exitoso',
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el inicio de sesión', error: error.message });
    }
};