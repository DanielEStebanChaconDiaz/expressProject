const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
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
                    googleId: profile.id,
                    nombreUsuario: profile.displayName,
                    correoElectronico: profile.emails[0].value,
                    fotoPerfil: profile.photos[0].value
                });
                await user.save();
            } else {
                // Si el usuario ya existe pero solo por correo, actualiza el googleId y la foto
                user.googleId = profile.id; // Si deseas almacenar el googleId también
                user.fotoPerfil = profile.photos[0].value || user.fotoPerfil;
                await user.save();
            }
        } else {
            // Si ya existe, actualiza el correo y la foto de perfil
            user.correoElectronico = profile.emails[0].value || user.correoElectronico;
            user.fotoPerfil = profile.photos[0].value || user.fotoPerfil;
            await user.save();
        }

        done(null, user);
    } catch (err) {
        console.error("Error en la autenticación de Google:", err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Controlador para verificar el estado del usuario
exports.users = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google');
    }
    // Si el usuario está autenticado, redirige a la página deseada
    res.redirect('https://localhost:5000/#/home');
};
