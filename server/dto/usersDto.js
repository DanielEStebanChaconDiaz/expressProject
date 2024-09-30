class UserDTO {
  /**
   * Constructor de la clase UserDTO.
   * @param {Object} usuario - Objeto con los datos del usuario que se va a transformar.
   */
  constructor(usuario) {
    console.log('Usuario:', usuario); // Muestra en consola el objeto usuario

    this._id = usuario._id || null;                      // ID único del usuario
    this.fotoPerfil = usuario.fotoPerfil || null;        // URL de la foto de perfil del usuario
    this.nombreUsuario = usuario.nombreUsuario || null;  // Nombre de usuario
    this.correoElectronico = usuario.correoElectronico || null; // Correo electrónico del usuario
    this.celular = usuario.celular || null;              // Número de celular del usuario
    this.sexo = usuario.sexo || null;                    // Sexo del usuario
    this.fechaNacimiento = usuario.fechaNacimiento || null; // Fecha de nacimiento del usuario
    this.direccion = usuario.direccion || null;          // Dirección del usuario
    this.tipo = usuario.tipo || 'comprador';              // Tipo de usuario (por defecto 'comprador')
    this.metodosPago = usuario.metodosPago || [];        // Métodos de pago del usuario
    this.productosComprados = usuario.productosComprados || []; // Productos que el usuario ha comprado
    this.talleresSuscritos = usuario.talleresSuscritos || []; // Talleres a los que el usuario está suscrito
    this.tiendaFavoritas = usuario.tiendaFavoritas || []; // Tiendas favoritas del usuario
    this.productosFavoritos = usuario.productosFavoritos || []; // Productos favoritos del usuario
    this.talleresFavoritos = usuario.talleresFavoritos || []; // Talleres favoritos del usuario
    this.cuponesAsignados = usuario.cuponesAsignados || []; // Cupones asignados al usuario
    this.facebookId = usuario.facebookId || null;        // ID de Facebook del usuario (si aplica)
    this.googleId = usuario.googleId || null;            // ID de Google del usuario (si aplica)
    this.discordId = usuario.discordId || null;          // ID de Discord del usuario (si aplica)
    this.providerData = usuario.providerData || {};      // Datos del proveedor (ej. autenticación)
    this.carrito = usuario.carrito || [];                // Artículos en el carrito del usuario
  }
}

module.exports = UserDTO;
