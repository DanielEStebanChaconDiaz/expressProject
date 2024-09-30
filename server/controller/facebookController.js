// Importación de los módulos necesarios
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user'); // Modelo de usuario

// Configuración de la estrategia de autenticación de Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID, // ID del cliente de Facebook
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Secreto del cliente de Facebook
    callbackURL: '/auth/facebook/callback', // URL de redirección después de la autenticación
    profileFields: ['id', 'displayName', 'emails', 'photos'] // Campos del perfil a solicitar
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Busca un usuario en la base de datos por su ID de Facebook
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            // Si no existe, crea un nuevo usuario
            user = new User({
                facebookId: profile.id, // Asigna el ID de Facebook
                nombreUsuario: profile.displayName, // Asigna el nombre de usuario
                correoElectronico: (profile.emails && profile.emails[0]) ? profile.emails[0].value : '', // Asigna el correo electrónico
                fotoPerfil: (profile.photos && profile.photos[0]) ? profile.photos[0].value : '' // Asigna la foto de perfil
            });
            await user.save(); // Guarda el nuevo usuario en la base de datos
        } else {
            // Si el usuario ya existe, actualiza sus datos
            user.correoElectronico = (profile.emails && profile.emails[0]) ? profile.emails[0].value : user.correoElectronico; // Actualiza el correo si se proporciona
            user.fotoPerfil = (profile.photos && profile.photos[0]) ? profile.photos[0].value : user.fotoPerfil; // Actualiza la foto de perfil si se proporciona
            await user.save(); // Guarda los cambios
        }
        done(null, user); // Devuelve el usuario autenticado
    } catch (err) {
        done(err, null); // Manejo del error en la autenticación
    }
}));

// Serialización del usuario para almacenar su ID en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id); // Almacena el ID del usuario
});

// Deserialización del usuario para recuperar el objeto usuario a partir del ID
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Busca el usuario por ID
        done(null, user); // Devuelve el usuario
    } catch (err) {
        done(err, null); // Manejo del error
    }
});

// Exporta la función para obtener el perfil del usuario autenticado
exports.users = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/facebook'); // Redirige si no hay usuario autenticado
    }
    res.json(req.user); // Devuelve el perfil del usuario autenticado
};
