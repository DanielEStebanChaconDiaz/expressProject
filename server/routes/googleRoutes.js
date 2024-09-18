const express = require('express');
const passport = require('passport');
const pageController = require('../controller/googleController');
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/usersGoogle');
    }
);

router.get('/usersGoogle', pageController.users);

module.exports = router;