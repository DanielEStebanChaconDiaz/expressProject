const { body, validationResult } = require('express-validator');

const actualizarUsuarioValidator = () => {
  return [
    body('nombreUsuario').optional().notEmpty().withMessage('El nombre de usuario no puede estar vacío.'),
    body('correoElectronico').optional().isEmail().withMessage('El correo electrónico no es válido.'),
    body('celular').optional().notEmpty().withMessage('El número de celular no puede estar vacío.'),
    body('sexo').optional().isIn(['masculino', 'femenino', 'otro']).withMessage('Sexo no válido.'),
    body('fechaNacimiento').optional().isDate().withMessage('La fecha de nacimiento no es válida.'),
    body('direccion').optional().notEmpty().withMessage('La dirección no puede estar vacía.'),
    body('tipo').optional().isIn(['comprador', 'artesano']).withMessage('Tipo de usuario no válido.'),
    body('metodosPago').optional().isArray().withMessage('Métodos de pago debe ser un array.'),
    body('metodosPago.*.tipo').optional().notEmpty().withMessage('El tipo de método de pago no puede estar vacío.'),
    body('metodosPago.*.detalles').optional().notEmpty().withMessage('Los detalles del método de pago no pueden estar vacíos.'),
  ];
};

const validarDatos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = {
  actualizarUsuarioValidator,
  validarDatos,
};