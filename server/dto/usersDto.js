class UserDTO {
    constructor(usuario) {
      this.fotoPerfil = usuario.fotoPerfil || null;
      this.nombreUsuario = usuario.nombreUsuario || null;
      this.correoElectronico = usuario.correoElectronico || null;
      this.celular = usuario.celular || null;
      this.sexo = usuario.sexo || null;
      this.fechaNacimiento = usuario.fechaNacimiento || null;
      this.metodosPago = usuario.metodosPago || [];
      this.productosComprados = usuario.productosComprados || [];
      this.talleresSuscritos = usuario.talleresSuscritos || [];
      this.facebookId = usuario.facebookId || null;
      this.googleId = usuario.googleId || null;
      this.instagramId = usuario.instagramId || null;
      this.providerData = usuario.providerData || {};
    }
  }
  
  module.exports = UserDTO;
  