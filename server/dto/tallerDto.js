class TallerDTO {
    /**
   * Constructor de la clase TallerDTO.
   * @param {Object} taller - Objeto con los datos del taller que se va a transformar.
   */
    constructor(taller) {
      this.id = taller._id;
      this.tiendaId = taller.tiendaId;
      this.nombre = taller.nombre;
      this.descripcion = taller.descripcion;
      this.publicoObjetivo = taller.publicoObjetivo;
      this.duracion = taller.duracion;
      this.fechaInicio = taller.fechaInicio;
      this.fechaFin = taller.fechaFin;
      this.horario = taller.horario;
      this.materiales = taller.materiales;
      this.modalidad = taller.modalidad;
      this.lugar = taller.lugar;
      this.documental = taller.documental;
      this.imagen = taller.imagen;
      this.video = taller.video;
    }
  }


module.exports = TallerDTO;
