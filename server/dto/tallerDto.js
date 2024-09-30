class TallerDTO {
  /**
   * Constructor de la clase TallerDTO.
   * @param {Object} taller - Objeto con los datos del taller que se va a transformar.
   */
  constructor(taller) {
    this.id = taller._id;                // ID único del taller
    this.tiendaId = taller.tiendaId;     // ID de la tienda asociada al taller
    this.nombre = taller.nombre;          // Nombre del taller
    this.descripcion = taller.descripcion; // Descripción del taller
    this.publicoObjetivo = taller.publicoObjetivo; // Público objetivo del taller
    this.duracion = taller.duracion;      // Duración del taller
    this.fechaInicio = taller.fechaInicio; // Fecha de inicio del taller
    this.fechaFin = taller.fechaFin;      // Fecha de finalización del taller
    this.horario = taller.horario;        // Horario en que se llevará a cabo el taller
    this.materiales = taller.materiales;  // Materiales necesarios para el taller
    this.modalidad = taller.modalidad;    // Modalidad del taller (presencial, virtual, etc.)
    this.lugar = taller.lugar;            // Lugar donde se llevará a cabo el taller
    this.documental = taller.documental;  // Documental relacionado con el taller (si aplica)
    this.imagen = taller.imagen;          // URL de la imagen del taller
  }
}

module.exports = TallerDTO;
