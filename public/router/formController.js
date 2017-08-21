const express = require('express');
const router = module.exports = express.Router();

const tools = require('../../Slack/tools/exporter');

const userProfile = require('../../Database/profileModel').userProfile;

// handles incoming profile creation and validation 
router.post ('/create-profile', (req, res) => {
    userProfile.addProfile(req.body.userData);
    res.json({userCreated: true})
});

router.post('/validate-username', (req, res) => {
    userProfile.getProfile(req.body.userName).then( user => res.send(!user));
});



