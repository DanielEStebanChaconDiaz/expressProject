class TiendaDTO {
  /**
   * Constructor de la clase TiendaDTO.
   * @param {Object} tienda - Objeto con los datos de la tienda que se va a transformar.
   */
  constructor(tienda) {
    this.id = tienda._id;                  // ID único de la tienda
    this.nombre = tienda.nombre;            // Nombre de la tienda
    this.imagen = tienda.imagen;            // URL de la imagen de la tienda
    this.descripcion = tienda.descripcion;   // Descripción de la tienda
    this.artesanoId = tienda.artesanoId;    // ID del artesano asociado a la tienda
    this.video = tienda.video;              // URL del video de la tienda (si aplica)
    this.qr = tienda.qr;                    // Código QR asociado a la tienda
    this.productos = tienda.productos;      // Lista de productos disponibles en la tienda
    this.talleres = tienda.talleres;        // Lista de talleres ofrecidos por la tienda
  }
}

module.exports = TiendaDTO;
