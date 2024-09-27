class TiendaDTO {
    constructor(tienda) {
      this.id = tienda._id;
      this.nombre = tienda.nombre;
      this.imagen = tienda.imagen;
      this.descripcion = tienda.descripcion;
      this.artesanoId = tienda.artesanoId;
      this.video = tienda.video;
      this.qr = tienda.qr;
      this.productos = tienda.productos;
      this.talleres = tienda.talleres;
    }
  }
  
  module.exports = TiendaDTO;
  