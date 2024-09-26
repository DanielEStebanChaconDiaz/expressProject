class CuponDto {
    constructor(cupon) {
      this.id = cupon._id;
      this.codigo = cupon.codigo;
      this.descuento = cupon.descuento;
      this.tipo = cupon.tipo;
      this.fechaExpiracion = cupon.fechaExpiracion;
      this.usuarioId = cupon.usuarioId;
      this.productoId = cupon.productoId;
      this.tallerId = cupon.tallerId;
    }
  }
  
  module.exports = CuponDto;