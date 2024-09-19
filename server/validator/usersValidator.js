
const { body, validationResult } = require('express-validator');

const actualizarUsuarioValidator = () => {
  return [
    body('nombreUsuario').optional().notEmpty().withMessage('El nombre de usuario no puede estar vacío.'),
    body('correoElectronico').optional().isEmail().withMessage('El correo electrónico no es válido.'),
    body('celular').optional().notEmpty().withMessage('El número de celular no puede estar vacío.'),
    body('sexo').optional().isIn(['masculino', 'femenino', 'otro']).withMessage('Sexo no válido.'),
    body('fechaNacimiento').optional().isDate().withMessage('La fecha de nacimiento no es válida.'),
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
