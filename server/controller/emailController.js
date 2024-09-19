const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { nombreUsuario, correoElectronico, contrasena, sexo, fechaNacimiento } = req.body;

    try {
        let user = await User.findOne({ correoElectronico });

        if (!user) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            user = new User({
                nombreUsuario,
                correoElectronico,
                contrasena: hashedPassword,
                sexo,
                fechaNacimiento
            });
            await user.save();
            return res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } else {
            // Actualizar datos existentes
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
