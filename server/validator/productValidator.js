const { body, param } = require('express-validator');

const validadorCrearProducto = [
  body('tiendaId').isMongoId().withMessage('ID de tienda inválido'),
  body('imagen').optional().isURL().withMessage('La URL de la imagen no es válida'),
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('descripcion').optional(),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('dimensiones').optional(),
  body('disponibilidad').isInt({ min: 0 }).withMessage('La disponibilidad debe ser un número entero no negativo'),
  body('descuento').optional().isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser un número entre 0 y 100'),
  body('categoria').notEmpty().withMessage('La categoría es requerida'),
  body('tipo').isIn(['bordado', 'ceramica', 'joyeria', 'textiles']).withMessage('Tipo de producto no válido')
];

const validadorActualizarProducto = [
  param('id').isMongoId().withMessage('ID de producto inválido'),
  ...validadorCrearProducto
];

const validadorObtenerProducto = [
  param('id').isMongoId().withMessage('ID de producto inválido')
];

module.exports = {
  validadorCrearProducto,
  validadorActualizarProducto,
  validadorObtenerProducto
};