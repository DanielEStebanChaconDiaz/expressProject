const { body } = require('express-validator');

const validarCrearCupon = [
  body('codigo').isString().notEmpty().withMessage('El código es requerido'),
  body('descuento').isNumeric().notEmpty().withMessage('El descuento es requerido y debe ser un número'),
  body('tipo').isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'),
  body('fechaExpiracion').optional().isISO8601().toDate().withMessage('La fecha de expiración debe ser una fecha válida'),
  body('usuarioId').optional().isMongoId().withMessage('El ID de usuario debe ser un MongoID válido'),
  body('productoId').optional().isMongoId().withMessage('El ID de producto debe ser un MongoID válido'),
  body('tallerId').optional().isMongoId().withMessage('El ID de taller debe ser un MongoID válido')
];

const validarActualizarCupon = [
  body('codigo').optional().isString().withMessage('El código debe ser una cadena de texto'),
  body('descuento').optional().isNumeric().withMessage('El descuento debe ser un número'),
  body('tipo').optional().isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'),
  body('fechaExpiracion').optional().isISO8601().toDate().withMessage('La fecha de expiración debe ser una fecha válida'),
  body('usuarioId').optional().isMongoId().withMessage('El ID de usuario debe ser un MongoID válido'),
  body('productoId').optional().isMongoId().withMessage('El ID de producto debe ser un MongoID válido'),
  body('tallerId').optional().isMongoId().withMessage('El ID de taller debe ser un MongoID válido')
];

module.exports = {
  validarCrearCupon,
  validarActualizarCupon
};