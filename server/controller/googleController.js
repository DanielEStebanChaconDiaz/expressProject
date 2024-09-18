const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                nombreUsuario: profile.displayName,
                correoElectronico: profile.emails[0].value,
                fotoPerfil: profile.photos[0].value
            });
            await user.save();
        } else {
            user.email = profile.emails[0].value || user.email;
            user.fotoPerfil = profile.photos[0].value || user.fotoPerfil;
            await user.save();
        }
        done(null, user);
    } catch (err) {
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

exports.users = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/google');
    }
};
