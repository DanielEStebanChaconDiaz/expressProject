const { body, param } = require('express-validator');

const validateCreate = [
  body('tiendaId').isMongoId().withMessage('El ID de la tienda es inválido'),
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('fechaInicio').isISO8601().toDate().withMessage('La fecha de inicio es inválida'),
  body('fechaFin').isISO8601().toDate().withMessage('La fecha de fin es inválida'),
  body('modalidad').isIn(['presencial', 'virtual']).withMessage('La modalidad es inválida'),
];

const validateUpdate = [
  param('id').isMongoId().withMessage('ID inválido'),
  body('tiendaId').optional().isMongoId().withMessage('El ID de la tienda es inválido'),
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('fechaInicio').optional().isISO8601().toDate().withMessage('La fecha de inicio es inválida'),
  body('fechaFin').optional().isISO8601().toDate().withMessage('La fecha de fin es inválida'),
  body('modalidad').optional().isIn(['presencial', 'virtual']).withMessage('La modalidad es inválida'),
];

const validateId = [
  param('id').isMongoId().withMessage('ID inválido'),
];

module.exports = {
  validateCreate,
  validateUpdate,
  validateId,
};
