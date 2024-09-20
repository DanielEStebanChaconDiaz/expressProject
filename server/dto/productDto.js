class DTOProducto {
    constructor(datos) {
      this.id = datos._id;
      this.idTienda = datos.idTienda;
      this.imagen = datos.imagen;
      this.nombre = datos.nombre;
      this.descripcion = datos.descripcion;
      this.precio = datos.precio;
      this.dimensiones = datos.dimensiones;
      this.disponibilidad = datos.disponibilidad;
      this.descuento = datos.descuento;
      this.categoria = datos.categoria;
      this.tipo = datos.tipo;
    }
  
    static desdeEntidad(producto) {
      return new DTOProducto(producto);
    }
  
    static aEntidad(dto) {
      return {
        idTienda: dto.idTienda,
        imagen: dto.imagen,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        dimensiones: dto.dimensiones,
        disponibilidad: dto.disponibilidad,
        descuento: dto.descuento,
        categoria: dto.categoria,
        tipo: dto.tipo
      };
    }
  }
  
  module.exports = DTOProducto;