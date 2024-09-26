const express = require('express');
const passport = require('passport');
const pageController = require('../controller/googleController');
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('https://localhost:5000/#/home');
    }
);

router.get('https://localhost:5000/#/home', pageController.users);

module.exports = router;