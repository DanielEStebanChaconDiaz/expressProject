// Importación de los módulos necesarios
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); // Modelo de usuario

// Configuración de la estrategia de autenticación de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // ID del cliente de Google
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Secreto del cliente de Google
    callbackURL: process.env.GOOGLE_CALLBACK_URL, // URL de redirección después de la autenticación
    scope: ['profile', 'email'] // Alcances solicitados para la autenticación
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Busca si ya existe un usuario con el googleId
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            // Si no existe, busca si hay un usuario con el mismo correo electrónico
            user = await User.findOne({ correoElectronico: profile.emails[0].value });
            
            if (!user) {
                // Si no existe, crea uno nuevo
                user = new User({
                    googleId: profile.id, // Asigna el googleId
                    nombreUsuario: profile.displayName, // Asigna el nombre de usuario
                    correoElectronico: profile.emails[0].value, // Asigna el correo electrónico
                    fotoPerfil: profile.photos[0].value // Asigna la foto de perfil
                });
                await user.save(); // Guarda el nuevo usuario en la base de datos
            } else {
                // Si el usuario ya existe pero solo por correo, actualiza el googleId y la foto
                user.googleId = profile.id; // Almacena el googleId
                user.fotoPerfil = profile.photos[0].value || user.fotoPerfil; // Actualiza la foto de perfil
                await user.save(); // Guarda los cambios
            }
        } else {
            // Si ya existe, actualiza el correo y la foto de perfil
            user.correoElectronico = profile.emails[0].value || user.correoElectronico; // Actualiza el correo si se proporciona
            user.fotoPerfil = profile.photos[0].value || user.fotoPerfil; // Actualiza la foto de perfil si se proporciona
            await user.save(); // Guarda los cambios
        }

        done(null, user); // Devuelve el usuario autenticado
    } catch (err) {
        console.error("Error en la autenticación de Google:", err); // Manejo de errores
        done(err, null); // Devuelve el error
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

// Controlador para verificar el estado del usuario
exports.users = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google'); // Redirige si no hay usuario autenticado
    }
    // Si el usuario está autenticado, redirige a la página deseada
    res.redirect('https://localhost:5000/#/home'); // Redirige a la página de inicio
};
