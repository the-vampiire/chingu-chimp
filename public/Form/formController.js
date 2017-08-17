const express = require('express');
const router = module.exports = express.Router();

const tools = require('../../Slack/tools/exporter');

// handles incoming profile creation and validation 
router.post ('/create-profile', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.addProfile(req.body.userData);

    res.json({userCreated: true})
});

router.post('/validate-username', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.getProfile(req.body.userName).then( user => res.send(!user));
});



