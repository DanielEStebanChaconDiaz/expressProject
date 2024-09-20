class MensajeDto {
    constructor(mensaje) {
      this.id = mensaje._id;
      this.remitenteId = mensaje.remitenteId;
      this.receptorId = mensaje.receptorId;
      this.contenido = mensaje.contenido;
      this.fecha = mensaje.fecha;
    }
  }
  
  module.exports = MensajeDto;