const { body } = require('express-validator');

const validarCrearMensaje = [
  body('remitenteId').isMongoId().withMessage('El ID del remitente debe ser un MongoID válido'),
  body('receptorId').isMongoId().withMessage('El ID del receptor debe ser un MongoID válido'),
  body('contenido').isString().notEmpty().withMessage('El contenido del mensaje es requerido'),
  body('fecha').optional().isISO8601().toDate().withMessage('La fecha debe ser una fecha válida')
];

module.exports = {
  validarCrearMensaje
};
