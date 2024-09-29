const bcrypt = require('bcrypt');
const usuarioService = require('../services/users');
const productoService = require('../services/product');
const cuponService = require('../services/coupons');
const UserDTO = require('../dto/usersDto');
const { uploadToCloudinary } = require('../config/cloudinaryConfig');
const Usuario = require('../models/user');
const Producto = require('../models/product');
const mongoose = require('mongoose');

exports.registerUser = async (req, res) => {
  const { nombreUsuario, correoElectronico, contrasena, sexo, fechaNacimiento, tipo } = req.body;

  try {
    const existingUserByUsername = await usuarioService.obtenerUsuarioPorNombre(nombreUsuario);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }
    const existingUserByEmail = await usuarioService.obtenerUsuarioPorCorreo(correoElectronico);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

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
    const existingUserByPhone = await usuarioService.obtenerUsuarioPorCelular(req.body.celular);
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'El número de celular ya está en uso' });
    }

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
  // console.log('Session:', req.session);
  // console.log('Is authenticated:', req.isAuthenticated());
  // console.log('User:', req.user);
  // console.log('Passport:', req._passport);

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
}

exports.agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    console.log('Datos recibidos:', { productoId, cantidad });

    // Verificar si el usuario está autenticado
    let userId;
    if (req.user && req.user._id) {
      userId = req.user._id;
    } else if (req.session && req.session.user && req.session.user._id) {
      userId = req.session.user._id;
    } else {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    console.log('ID de usuario:', userId);

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', usuario);

    // Verificar que productoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ mensaje: 'ID de producto inválido' });
    }

    const producto = await Producto.findById(productoId);
    console.log('Producto encontrado:', producto);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado', productoId });
    }

    // Inicializar el carrito si no existe
    if (!usuario.carrito) {
      usuario.carrito = [];
    }

    // Verificar si el producto ya está en el carrito
    const itemIndex = usuario.carrito.findIndex(item => item.producto.toString() === productoId);

    if (itemIndex > -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      usuario.carrito[itemIndex].cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo
      usuario.carrito.push({ producto: productoId, cantidad });
    }

    await usuario.save();

    // Poblar el carrito antes de enviarlo como respuesta
    const usuarioPopulado = await Usuario.findById(userId).populate('carrito.producto');

    res.status(200).json({
      mensaje: 'Producto agregado al carrito',
      carrito: usuarioPopulado.carrito
    });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({
      mensaje: 'Error al agregar al carrito',
      error: error.message,
      stack: error.stack // Incluir el stack trace para depuración
    });
  }
};


exports.removerDelCarrito = async (req, res) => {
  try {
    const { itemId } = req.params;
    let userId;
    if (req.user && req.user._id) {
      userId = req.user._id;
    } else if (req.session && req.session.user && req.session.user._id) {
      userId = req.session.user._id;
    } else {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.carrito = usuario.carrito.filter(item => item.producto.toString() !== itemId);
    await usuario.save();

    const usuarioPopulado = await Usuario.findById(userId).populate('carrito.producto');

    res.status(200).json({
      mensaje: 'Item removido del carrito',
      carrito: usuarioPopulado.carrito
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al remover del carrito', error: error.message });
  }
};


exports.aplicarCupon = async (req, res) => {
  try {
    const { codigoCupon } = req.body;
    const cupon = await cuponService.obtenerCuponPorCodigo(codigoCupon);
    if (!cupon || new Date() > cupon.fechaExpiracion) {
      return res.status(400).json({ mensaje: 'Cupón inválido o expirado' });
    }

    if (!req.session.cart || req.session.cart.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    let cuponAplicado = false;
    req.session.cart = req.session.cart.map(item => {
      if ((cupon.productoId && cupon.productoId.toString() === item.itemId.toString() && item.tipo === 'producto') ||
        (cupon.tallerId && cupon.tallerId.toString() === item.itemId.toString() && item.tipo === 'taller') ||
        (!cupon.productoId && !cupon.tallerId)) {
        if (cupon.tipo === 'porcentaje') {
          item.descuento = (item.precio * cupon.descuento) / 100;
        } else if (cupon.tipo === '2x1' && item.cantidad > 1) {
          item.cantidad -= 1;
        }
        cuponAplicado = true;
      }
      return item;
    });

    if (!cuponAplicado) {
      return res.status(400).json({ mensaje: 'El cupón no es aplicable a ningún item en el carrito' });
    }

    // Eliminar el cupón inmediatamente después de su uso
    await cuponService.eliminarCupon(cupon._id);

    res.status(200).json({ mensaje: 'Cupón aplicado exitosamente', carrito: req.session.cart });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aplicar el cupón', error: error.message });
  }
};

exports.realizarCompra = async (req, res) => {
  try {
    if (!req.session.cart || req.session.cart.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    const usuario = await usuarioService.obtenerUsuarioPorId(req.user._id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const productosComprados = req.session.cart.map(producto => ({
      item: producto.itemId,
      tipo: producto.tipo,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio - producto.descuento
    }));

    usuario.productosComprados = usuario.productosComprados || [];
    usuario.productosComprados.push(...productosComprados);

    await usuario.save();

    // Limpiar el carrito
    req.session.cart = [];

    res.status(200).json({ mensaje: 'Compra realizada exitosamente', itemsComprados: productosComprados });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al realizar la compra', error: error.message });
  }
};







