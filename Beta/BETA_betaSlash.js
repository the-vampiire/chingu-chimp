/**
 * Created by Vampiire on 8/12/17.
 */

const express = require('express');
const router = module.exports = express.Router();

router.post('/', (req, res) => {

    const respond = require('./betaSlashResponses');

    const text = req.body.text;

    switch(text){
        case 'start':
            res.json(respond.startResponse());
            break;
        case 'update help':
            res.json(respond.updateHelpResponse());
            break;
        case 'update command':
            res.json(respond.updateCommandResponse());
            break;
        case 'checkin command':
            res.json(respond.checkinCommandResponse());
            break;
        case 'profile help':
            res.json(respond.profileHelpResponse());
            break;
        case 'profile command':
            res.json(respond.profileCommandResponse());
            break;
    }

});



