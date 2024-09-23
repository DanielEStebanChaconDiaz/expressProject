const { body, validationResult } = require('express-validator');

const registerUserValidator = () => {
    return [
        body('nombreUsuario').notEmpty().withMessage('El nombre de usuario es requerido.'),
        body('correoElectronico').isEmail().withMessage('El correo electrónico no es válido.'),
        body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
        body('sexo').isIn(['masculino', 'femenino', 'otro']).withMessage('Sexo no válido.'),
        body('fechaNacimiento').isDate().withMessage('La fecha de nacimiento no es válida.'),
        body('tipo').optional().isIn(['comprador', 'artesano']).withMessage('Tipo de usuario no válido.'),
    ];
};

const registerUserByPhoneValidator = () => {
    return [
        body('nombreUsuario').notEmpty().withMessage('El nombre de usuario es requerido.'),
        body('celular').matches(/^\+?(57|58)\d{10}$/).withMessage('Número de celular no válido. Debe comenzar con +57 o +58 y tener 12 dígitos.'),
        body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
        body('sexo').isIn(['masculino', 'femenino', 'otro']).withMessage('Sexo no válido.'),
        body('fechaNacimiento').isDate().withMessage('La fecha de nacimiento no es válida.'),
        body('tipo').optional().isIn(['comprador', 'artesano']).withMessage('Tipo de usuario no válido.'),
    ];
};

const actualizarUsuarioValidator = () => {
    return [
        body('nombreUsuario').optional().notEmpty().withMessage('El nombre de usuario no puede estar vacío.'),
        body('correoElectronico').optional().isEmail().withMessage('El correo electrónico no es válido.'),
        body('celular').optional().matches(/^\+?(57|58)\d{10}$/).withMessage('Número de celular no válido. Debe comenzar con +57 o +58 y tener 12 dígitos.'),
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
    registerUserValidator,
    registerUserByPhoneValidator,
    actualizarUsuarioValidator,
    validarDatos,
};