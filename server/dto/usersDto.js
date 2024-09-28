class UserDTO {
  constructor(usuario) {
    console.log('Usuario:', usuario);
    
    this._id = usuario._id || null;
    this.fotoPerfil = usuario.fotoPerfil || null;
    this.nombreUsuario = usuario.nombreUsuario || null;
    this.correoElectronico = usuario.correoElectronico || null;
    this.celular = usuario.celular || null;
    this.sexo = usuario.sexo || null;
    this.fechaNacimiento = usuario.fechaNacimiento || null;
    this.direccion = usuario.direccion || null;
    this.tipo = usuario.tipo || 'comprador';
    this.metodosPago = usuario.metodosPago || [];
    this.productosComprados = usuario.productosComprados || [];
    this.talleresSuscritos = usuario.talleresSuscritos || [];
    this.tiendaFavoritas = usuario.tiendaFavoritas || [];
    this.productosFavoritos = usuario.productosFavoritos || [];
    this.talleresFavoritos = usuario.talleresFavoritos || [];
    this.cuponesAsignados = usuario.cuponesAsignados || [];
    this.facebookId = usuario.facebookId || null;
    this.googleId = usuario.googleId || null;
    this.discordId = usuario.discordId || null;
    this.providerData = usuario.providerData || {};
  }
}

module.exports = UserDTO;