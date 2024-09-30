// Importación del modelo de usuario y de bcrypt para el hashing de contraseñas
const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Función para registrar un nuevo usuario o actualizar uno existente.
 * @param {Object} req - El objeto de la solicitud que contiene los datos del usuario en req.body.
 * @param {Object} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 */
exports.registerUser = async (req, res) => {
    // Desestructuración de los datos del usuario desde la solicitud
    const { nombreUsuario, correoElectronico, contrasena, sexo, fechaNacimiento } = req.body;

    try {
        // Verifica si ya existe un usuario con el correo electrónico proporcionado
        let user = await User.findOne({ correoElectronico });

        if (!user) {
            // Si no existe, crea un nuevo usuario
            const hashedPassword = await bcrypt.hash(contrasena, 10); // Hash de la contraseña
            user = new User({
                nombreUsuario, // Nombre de usuario
                correoElectronico, // Correo electrónico
                contrasena: hashedPassword, // Contraseña hasheada
                sexo, // Sexo
                fechaNacimiento // Fecha de nacimiento
            });
            await user.save(); // Guarda el nuevo usuario en la base de datos
            return res.status(201).json({ message: 'Usuario registrado exitosamente', user }); // Respuesta exitosa
        } else {
            // Si el usuario ya existe, actualiza sus datos
            user.nombreUsuario = nombreUsuario || user.nombreUsuario; // Actualiza el nombre de usuario si se proporciona
            if (contrasena) {
                user.contrasena = await bcrypt.hash(contrasena, 10); // Actualiza la contraseña si se proporciona
            }
            user.sexo = sexo || user.sexo; // Actualiza el sexo si se proporciona
            user.fechaNacimiento = fechaNacimiento || user.fechaNacimiento; // Actualiza la fecha de nacimiento si se proporciona

            await user.save(); // Guarda los cambios en la base de datos
            return res.status(200).json({ message: 'Usuario actualizado exitosamente', user }); // Respuesta de éxito
        }
    } catch (error) {
        // Manejo de errores en el registro
        return res.status(500).json({ message: 'Error en el registro', error }); // Respuesta de error
    }
};
