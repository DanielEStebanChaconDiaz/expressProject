const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = new User({
                facebookId: profile.id,
                nombreUsuario: profile.displayName,
                correoElectronico: (profile.emails && profile.emails[0]) ? profile.emails[0].value : '',
                fotoPerfil: (profile.photos && profile.photos[0]) ? profile.photos[0].value : ''
            });
            await user.save();
        } else {
            user.email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : user.email;
            user.fotoPerfil = (profile.photos && profile.photos[0]) ? profile.photos[0].value : user.fotoPerfil;
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
        return res.redirect('/auth/facebook'); 
    }
};
