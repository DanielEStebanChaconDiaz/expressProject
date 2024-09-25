const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/user');

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/callback',
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ discordId: profile.id });
        if (!user) {
            user = new User({
                discordId: profile.id,
                nombreUsuario: profile.username,
                correoElectronico: profile.email,
                fotoPerfil: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
                providerData: {
                    discord: profile
                }
            });
            await user.save();
        } else {
            user.nombreUsuario = profile.username;
            user.correoElectronico = profile.email || user.correoElectronico;
            user.fotoPerfil = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
            user.providerData = {
                ...user.providerData,
                discord: profile
            };
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

exports.initiateDiscordAuth = passport.authenticate('discord');

exports.discordAuthCallback = passport.authenticate('discord', {
    successRedirect: 'https://localhost:5000/#/home',
    failureRedirect: '/'
});

exports.getUserProfile = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/discord');
    }
    res.json(req.user);
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};