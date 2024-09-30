class MensajeDto {
  /**
   * Constructor de la clase MensajeDto.
   * @param {Object} mensaje - Objeto del mensaje que se va a transformar.
   */
  constructor(mensaje) {
    this.id = mensaje._id;              // ID único del mensaje
    this.remitenteId = mensaje.remitenteId; // ID del remitente del mensaje
    this.receptorId = mensaje.receptorId;   // ID del receptor del mensaje
    this.contenido = mensaje.contenido;     // Contenido del mensaje
    this.fecha = mensaje.fecha;             // Fecha en que se envió el mensaje
  }
}

module.exports = MensajeDto;
