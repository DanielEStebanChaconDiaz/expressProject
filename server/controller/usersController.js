// Importación de módulos y servicios necesarios
const bcrypt = require('bcrypt');
const usuarioService = require('../services/users');
const productoService = require('../services/product');
const cuponService = require('../services/coupons');
const UserDTO = require('../dto/usersDto');
const { uploadToCloudinary } = require('../config/cloudinaryConfig');
const Usuario = require('../models/user');
const Producto = require('../models/product');
const mongoose = require('mongoose');

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.registerUser = async (req, res) => {
  const { nombreUsuario, correoElectronico, contrasena, sexo, fechaNacimiento, tipo } = req.body;

  try {
    // Verificar si el nombre de usuario ya está en uso
    const existingUserByUsername = await usuarioService.obtenerUsuarioPorNombre(nombreUsuario);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Verificar si el correo electrónico ya está en uso
    const existingUserByEmail = await usuarioService.obtenerUsuarioPorCorreo(correoElectronico);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    // Crear el usuario en la base de datos
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

/**
 * Registra un nuevo usuario usando su número de celular.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.registerUserByPhone = async (req, res) => {
  const { nombreUsuario, celular, contrasena, sexo, fechaNacimiento, tipo } = req.body;

  try {
    // Verificar si el número de celular ya está en uso
    const existingUserByPhone = await usuarioService.obtenerUsuarioPorCelular(req.body.celular);
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'El número de celular ya está en uso' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    
    // Crear el usuario
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

/**
 * Obtiene la lista de todos los usuarios registrados.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.status(200).json(usuarios.map(usuario => new UserDTO(usuario)));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

/**
 * Obtiene un usuario específico por su ID.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Actualiza la foto de perfil del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.actualizarFotoPerfil = async (req, res) => {
  try {
    // Verificar si se ha subido una imagen
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    // Subir la imagen a Cloudinary
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

/**
 * Actualiza los datos del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.actualizarUsuario = async (req, res) => {
  try {
    let datosActualizacion = req.body;

    // Si hay un archivo, se sube y se actualiza el campo fotoPerfil
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

/**
 * Elimina un usuario por su ID.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Agrega un producto a la lista de favoritos del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Agrega un taller a la lista de favoritos del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Agrega una tienda a la lista de favoritas del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Obtiene el usuario actualmente logueado.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.obtenerUsuarioLogueado = (req, res) => {
  let user;

  if (req.isAuthenticated && req.isAuthenticated()) {
    user = req.user;
  } else if (req.session && req.session.user) {
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

/**
 * Cierra la sesión del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

  res.status(200).json({ message: 'Logout exitoso' });
};

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

/**
 * Agrega un producto al carrito del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    // Verificar si el usuario está autenticado
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

    // Verificar que productoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ mensaje: 'ID de producto inválido' });
    }

    const producto = await Producto.findById(productoId);
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
    res.status(500).json({
      mensaje: 'Error al agregar al carrito',
      error: error.message
    });
  }
};

/**
 * Remueve un item del carrito del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
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

    // Filtrar el carrito para eliminar el item
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

/**
 * Aplica un cupón al carrito del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.aplicarCupon = async (req, res) => {
  try {
    const { codigoCupon } = req.body;
    const cupon = await cuponService.obtenerCuponPorCodigo(codigoCupon);
    
    // Validar si el cupón existe y no ha expirado
    if (!cupon || new Date() > cupon.fechaExpiracion) {
      return res.status(400).json({ mensaje: 'Cupón inválido o expirado' });
    }

    let userId;
    if (req.user && req.user._id) {
      userId = req.user._id;
    } else if (req.session && req.session.user && req.session.user._id) {
      userId = req.session.user._id;
    } else {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const usuario = await Usuario.findById(userId).populate('carrito.producto');
    if (!usuario || !usuario.carrito || usuario.carrito.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    let cuponAplicado = false;
    usuario.carrito = usuario.carrito.map(item => {
      // Aplicar el descuento si es aplicable
      if ((cupon.productoId && cupon.productoId.toString() === item.producto._id.toString()) ||
          (!cupon.productoId)) {
        if (cupon.tipo === 'porcentaje') {
          item.descuento = (item.producto.precio * cupon.descuento) / 100;
          item.precioConDescuento = item.producto.precio - item.descuento;
        } else if (cupon.tipo === '2x1' && item.cantidad > 1) {
          item.cantidad -= 1;
          item.precioConDescuento = item.producto.precio;
        }
        cuponAplicado = true;
      } else {
        item.precioConDescuento = item.producto.precio;
      }
      return item;
    });

    if (!cuponAplicado) {
      return res.status(400).json({ mensaje: 'El cupón no es aplicable a ningún item en el carrito' });
    }

    await usuario.save();

    // Eliminar el cupón inmediatamente después de su uso
    await cuponService.eliminarCupon(cupon._id);

    res.status(200).json({ mensaje: 'Cupón aplicado exitosamente', carrito: usuario.carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aplicar el cupón', error: error.message });
  }
};

/**
 * Realiza la compra de los productos en el carrito del usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
exports.realizarCompra = async (req, res) => {
  try {
    let userId;
    if (req.user && req.user._id) {
      userId = req.user._id;
    } else if (req.session && req.session.user && req.session.user._id) {
      userId = req.session.user._id;
    } else {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const usuario = await Usuario.findById(userId).populate('carrito.producto');
    if (!usuario || !usuario.carrito || usuario.carrito.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    const productosComprados = usuario.carrito.map(item => ({
      item: item.producto._id,
      tipo: item.producto.tipo,
      cantidad: item.cantidad,
      precioUnitario: item.precioConDescuento || item.producto.precio
    }));

    usuario.productosComprados = usuario.productosComprados || [];
    usuario.productosComprados.push(...productosComprados);

    // Limpiar el carrito
    usuario.carrito = [];

    await usuario.save();

    res.status(200).json({ mensaje: 'Compra realizada exitosamente', itemsComprados: productosComprados });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al realizar la compra', error: error.message });
  }
};
