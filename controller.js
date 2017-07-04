/**
 * Created by Vampiire on 7/2/17.
 *
 *
 * Interactive Messages
 *  SET: request URL
 *      optional: options load [for populating interactive messages with details from an external source]
 *
 *
 * FOR ADDITIONAL SECURITY
 *      get list of all chingu team names (team ID's) and add them to the slash verify function
 *      to check alongside the slack token. ensures all requests only occur between slack and bot
 *
 *
 *
 */

const express = require('express');
const router = module.exports = express.Router();

const tools = require('./tools/exporter');


// ------------------- SPLASH PAGE ------------------- //

router.get('/', (req, res) => {


    res.render('index');

});

// -------------------------------------------------- //


// ------------ INCOMING SLASH COMMANDS ------------- //

router.post('/chimp', (req, res) => {
    const body = req.body;

    console.log(body);
    console.log(`token ${body.token}`);

    console.log(`verify: ${tools.verify.slash(body.token)}`);

    console.log(body);
    res.json('test worked');
});

router.post('/profile', (req, res) => {
    console.log(req.body);
    res.json('got it');
});

router.post('/checkin', (req, res) => {
    console.log(req.body);
    res.json('got it');
});

// ------------------------------------------------ //




