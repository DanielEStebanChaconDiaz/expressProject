const express = require('express');
const passport = require('passport');
const instagramController = require('../controller/instagramController');
const router = express.Router();

router.get('/auth/instagram', passport.authenticate('instagram'));

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/usersInstagram');
    }
);

router.get('/usersInstagram', instagramController.users);

module.exports = router;
