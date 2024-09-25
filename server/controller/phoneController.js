const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUserByPhone = async (req, res) => {
    const { nombreUsuario, celular, contrasena, sexo, fechaNacimiento } = req.body;

    const phoneRegex = /^\+?(57|58)\d{10}$/;
    if (!phoneRegex.test(celular)) {
        return res.status(400).json({ message: 'Número de celular no válido. Debe comenzar con +57 o +58 y tener 12 dígitos.' });
    }

    try {
        let user = await User.findOne({ celular });

        if (!user) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            user = new User({
                nombreUsuario,
                celular,
                contrasena: hashedPassword,
                sexo,
                fechaNacimiento
            });
            await user.save();
            return res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } else {
            user.nombreUsuario = nombreUsuario || user.nombreUsuario;
            if (contrasena) {
                user.contrasena = await bcrypt.hash(contrasena, 10);
            }
            user.sexo = sexo || user.sexo;
            user.fechaNacimiento = fechaNacimiento || user.fechaNacimiento;

            await user.save();
            return res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el registro', error });
    }
};
