class TiendaDTO {
    constructor(tienda) {
      this.nombre = tienda.nombre;
      this.descripcion = tienda.descripcion;
      this.artesanoId = tienda.artesanoId;
      this.video = tienda.video;
      this.qr = tienda.qr;
      this.productos = tienda.productos;
      this.talleres = tienda.talleres;
    }
  }
  
  module.exports = TiendaDTO;
  