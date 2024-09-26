const express = require('express');
const passport = require('passport');
const pageController = require('../controller/facebookController');
const router = express.Router();
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'https://localhost:5000/#/home' }),
    (req, res) => {
        res.redirect('https://localhost:5000/#/home');
    }
);

router.get('https://localhost:5000/#/home', pageController.users);

module.exports = router;