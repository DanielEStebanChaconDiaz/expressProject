// Importación de los módulos necesarios
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/user'); // Modelo de usuario

// Configuración de la estrategia de autenticación de Discord
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID, // ID del cliente de Discord
    clientSecret: process.env.DISCORD_CLIENT_SECRET, // Secreto del cliente de Discord
    callbackURL: '/auth/discord/callback', // URL de redirección después de la autenticación
    scope: ['identify', 'email'] // Alcances solicitados para la autenticación
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Busca un usuario por su ID de Discord
        let user = await User.findOne({ discordId: profile.id });

        if (!user) {
            // Si el usuario no existe, intenta buscarlo por correo electrónico
            user = await User.findOne({ correoElectronico: profile.email });

            if (!user) {
                // Si no se encuentra, crea un nuevo usuario
                user = new User({
                    discordId: profile.id, // Asigna el ID de Discord
                    nombreUsuario: profile.username, // Asigna el nombre de usuario
                    correoElectronico: profile.email, // Asigna el correo electrónico
                    fotoPerfil: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`, // URL de la foto de perfil
                    providerData: {
                        discord: profile // Guarda el perfil de Discord
                    }
                });
                await user.save(); // Guarda el nuevo usuario en la base de datos
            } else {
                // Si el usuario existe por correo, actualiza los datos
                user.discordId = profile.id; // Asigna el discordId
                user.nombreUsuario = profile.username; // Actualiza el nombre de usuario
                user.fotoPerfil = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`; // Actualiza la foto de perfil

                // Asegúrate de que providerData esté inicializado
                user.providerData = user.providerData || {};
                user.providerData.discord = profile; // Guarda el perfil de Discord
                await user.save(); // Guarda los cambios
            }
        } else {
            // Si el usuario ya existe por discordId, actualiza los datos
            user.nombreUsuario = profile.username; // Actualiza el nombre de usuario
            user.correoElectronico = profile.email || user.correoElectronico; // Actualiza el correo si está disponible
            user.fotoPerfil = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`; // Actualiza la foto de perfil

            // Asegúrate de que providerData esté inicializado
            user.providerData = user.providerData || {};
            user.providerData.discord = profile; // Guarda el perfil de Discord
            await user.save(); // Guarda los cambios
        }

        done(null, user); // Devuelve el usuario autenticado
    } catch (err) {
        console.error('Error en la estrategia de Discord:', err);
        done(err, null); // Maneja el error en la autenticación
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
        done(err, null); // Maneja el error
    }
});

// Exporta las funciones de autenticación
exports.initiateDiscordAuth = passport.authenticate('discord');

exports.discordAuthCallback = passport.authenticate('discord', {
    successRedirect: 'https://localhost:5000/#/home', // Redirige a la página de inicio en caso de éxito
    failureRedirect: 'https://localhost:5000/#/login' // Redirige a la página de inicio de sesión en caso de fallo
});

// Exporta la función para obtener el perfil del usuario autenticado
exports.getUserProfile = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/discord'); // Redirige si no hay usuario autenticado
    }
    res.json(req.user); // Devuelve el perfil del usuario autenticado
};

// Exporta la función para cerrar sesión
exports.logout = (req, res) => {
    req.logout(); // Cierra la sesión del usuario
    res.redirect('/'); // Redirige a la página de inicio
};
