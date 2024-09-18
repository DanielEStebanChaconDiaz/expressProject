const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../models/user');

passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/auth/instagram/callback',
    scope: ['user_profile'] 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ instagramId: profile.id });
        if (!user) {
            user = new User({
                instagramId: profile.id,
                nombreUsuario: profile.displayName,
                correoElectronico: profile._json.email || '', 
                fotoPerfil: profile._json.profile_picture || '', 
            });
            await user.save();
        } else {
            user.nombreUsuario = profile.displayName;
            user.correoElectronico = profile._json.email || user.correoElectronico;
            user.imagenPerfil = profile._json.profile_picture || user.imagenPerfil;
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
        return res.redirect('/auth/instagram');
    }

};
