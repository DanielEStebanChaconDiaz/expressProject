// Importación del modelo de usuario y la biblioteca bcrypt para el hashing de contraseñas
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Registra un nuevo usuario utilizando su número de celular.
 * Si el usuario ya existe, actualiza sus datos.
 * @param {Object} req - El objeto de la solicitud que contiene los datos del usuario en req.body.
 * @param {Object} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
exports.registerUserByPhone = async (req, res) => {
    const { nombreUsuario, celular, contrasena, sexo, fechaNacimiento } = req.body;

    // Expresión regular para validar el formato del número de celular
    const phoneRegex = /^\+?(57|58)\d{10}$/;
    if (!phoneRegex.test(celular)) {
        return res.status(400).json({ message: 'Número de celular no válido. Debe comenzar con +57 o +58 y tener 12 dígitos.' });
    }

    try {
        // Verifica si el usuario ya existe en la base de datos
        let user = await User.findOne({ celular });

        if (!user) {
            // Si el usuario no existe, se crea un nuevo registro
            const hashedPassword = await bcrypt.hash(contrasena, 10); // Hash de la contraseña
            user = new User({
                nombreUsuario,
                celular,
                contrasena: hashedPassword,
                sexo,
                fechaNacimiento
            });
            await user.save(); // Guarda el nuevo usuario en la base de datos
            return res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } else {
            // Si el usuario ya existe, se actualizan sus datos
            user.nombreUsuario = nombreUsuario || user.nombreUsuario;
            if (contrasena) {
                user.contrasena = await bcrypt.hash(contrasena, 10); // Hash de la nueva contraseña si se proporciona
            }
            user.sexo = sexo || user.sexo;
            user.fechaNacimiento = fechaNacimiento || user.fechaNacimiento;

            await user.save(); // Guarda los cambios en la base de datos
            return res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
        }
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({ message: 'Error en el registro', error });
    }
};
