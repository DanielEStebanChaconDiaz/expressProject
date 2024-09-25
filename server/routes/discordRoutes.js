const express = require('express');
const router = express.Router();
const discordAuthController = require('../controller/discordController');

router.get('/auth/discord', discordAuthController.initiateDiscordAuth);

router.get('/auth/discord/callback', discordAuthController.discordAuthCallback);

router.get('/profile', discordAuthController.getUserProfile);

router.get('/logout', discordAuthController.logout);

module.exports = router;