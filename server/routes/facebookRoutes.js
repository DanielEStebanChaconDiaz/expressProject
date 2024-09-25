const express = require('express');
const passport = require('passport');
const pageController = require('../controller/facebookController');
const router = express.Router();
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5000/#/home');
    }
);

router.get('http://localhost:5000/#/home', pageController.users);

module.exports = router;