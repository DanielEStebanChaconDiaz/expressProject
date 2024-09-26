const usuarioService = require('../services/users');
const UserDTO = require('../dto/usersDto');

exports.login = async (req, res) => {
    const { contactInfo, password } = req.body;

    try {
        const usuario = await usuarioService.autenticarUsuario(contactInfo, password);

        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Configurar la sesión con la información del usuario
        req.session.user = new UserDTO(usuario);

        res.status(200).json({ 
            success: true,
            message: 'Login exitoso',
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
};