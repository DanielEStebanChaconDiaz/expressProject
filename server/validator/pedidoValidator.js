const { body, param } = require('express-validator');

const crearPedidoValidator = [
  body('usuarioId')
    .isMongoId().withMessage('El ID de usuario es inválido.')
    .notEmpty().withMessage('El ID de usuario es requerido.'),
  body('productos')
    .isArray().withMessage('Los productos deben ser un array.')
    .notEmpty().withMessage('El array de productos no puede estar vacío.'),
  body('total')
    .isNumeric().withMessage('El total debe ser un número.')
    .notEmpty().withMessage('El total es requerido.'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'enviado', 'entregado']).withMessage('Estado inválido.'),
  body('cuponAplicado')
    .optional()
    .isMongoId().withMessage('El ID del cupón es inválido.'),
];

const actualizarPedidoValidator = [
  param('id').isMongoId().withMessage('El ID del pedido es inválido.'),
  body('usuarioId')
    .optional()
    .isMongoId().withMessage('El ID de usuario es inválido.'),
  body('productos')
    .optional()
    .isArray().withMessage('Los productos deben ser un array.'),
  body('total')
    .optional()
    .isNumeric().withMessage('El total debe ser un número.'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'enviado', 'entregado']).withMessage('Estado inválido.'),
  body('cuponAplicado')
    .optional()
    .isMongoId().withMessage('El ID del cupón es inválido.'),
];

module.exports = {
  crearPedidoValidator,
  actualizarPedidoValidator,
};
