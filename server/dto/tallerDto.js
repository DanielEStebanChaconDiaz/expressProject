class TallerDTO {
    constructor(taller) {
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
    }
  }
  
  module.exports = TallerDTO;
  