class DTOProducto {
  /**
   * Constructor de la clase DTOProducto.
   * @param {Object} datos - Objeto con los datos del producto que se va a transformar.
   */
  constructor(datos) {
    this.id = datos._id;                // ID único del producto
    this.tiendaId = datos.tiendaId;     // ID de la tienda a la que pertenece el producto
    this.imagen = datos.imagen;          // URL de la imagen del producto
    this.nombre = datos.nombre;          // Nombre del producto
    this.descripcion = datos.descripcion; // Descripción del producto
    this.precio = datos.precio;          // Precio del producto
    this.dimensiones = datos.dimensiones; // Dimensiones del producto
    this.disponibilidad = datos.disponibilidad; // Disponibilidad del producto
    this.descuento = datos.descuento;   // Descuento aplicado al producto
    this.categoria = datos.categoria;    // Categoría del producto
    this.tipo = datos.tipo;              // Tipo de producto
  }

  /**
   * Método estático para crear un DTOProducto desde una entidad de producto.
   * @param {Object} producto - Entidad del producto.
   * @returns {DTOProducto} - Instancia de DTOProducto.
   */
  static desdeEntidad(producto) {
    return new DTOProducto(producto);
  }

  /**
   * Método estático para convertir un DTOProducto a una entidad.
   * @param {DTOProducto} dto - Instancia de DTOProducto.
   * @returns {Object} - Objeto que representa la entidad del producto.
   */
  static aEntidad(dto) {
    return {
      tiendaId: dto.tiendaId,            // ID de la tienda
      imagen: dto.imagen,                // URL de la imagen
      nombre: dto.nombre,                // Nombre del producto
      descripcion: dto.descripcion,       // Descripción del producto
      precio: dto.precio,                // Precio del producto
      dimensiones: dto.dimensiones,      // Dimensiones del producto
      disponibilidad: dto.disponibilidad, // Disponibilidad del producto
      descuento: dto.descuento,          // Descuento aplicado
      categoria: dto.categoria,          // Categoría del producto
      tipo: dto.tipo                     // Tipo de producto
    };
  }
}

module.exports = DTOProducto;
