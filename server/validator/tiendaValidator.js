const { body, param } = require('express-validator');

const validateCreate = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('artesanoId').isMongoId().withMessage('El ID del artesano es inválido'),
];

const validateUpdate = [
  param('id').isMongoId().withMessage('ID inválido'),
  body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('artesanoId').optional().isMongoId().withMessage('El ID del artesano es inválido'),
];

const validateId = [
  param('id').isMongoId().withMessage('ID inválido'),
];

module.exports = {
  validateCreate,
  validateUpdate,
  validateId,
};
