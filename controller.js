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
 *      to check alongside the slack token. ensures all requests only occur between chingu teams and bot
 *
 *
 *
 */

const express = require('express');
const router = module.exports = express.Router();

const tools = require('./tools/exporter');

// Global Constants


// ------------------- SPLASH PAGE ------------------- //

router.get('/form', (req, res) => {

    res.render('form');

});

router.get('/', (req, res) => {

    let data = {
        userName : 'vampiire',

        portfolioURL : 'https://www.vampiire.org',
        gitHubURL: 'https://www.github.com/the-vampiire',
        blogURL: 'https://medium.com/@vampiire',

        story: 'empty',

        joinDate: 5,

        cohort: [{
            cohortName : 'Walruses',
            startDate : 5
        }],

        aptitudes: {

            languages : [{
                name : 'javascript',
                level : 'intermediate'
            }],

            frameworks: [{
                name : 'bootstrap',
                level : 'intermediate'
            }]
        },

        projects: [{
            name : 'portfolio',
            url : 'https://www.vampiire.org',
        }],

        certifications: [{
            name: 'Front End Certification'
        }]
    };


    const userProfile = require('./database/profileModel').userProfile;
    userProfile.addProfile(data).then( e => console.log(e));

});

// -------------------------------------------------- //


// ------------ INCOMING SLASH COMMANDS ------------- //

router.post('/chimp', (req, res) => {
    const body = req.body;

    console.log(body);

    // verify Slack token
    if(tools.verify.slash(body.token)){

        const text = body.text;
        const user = body.user_name;
        const command = text.slice(0, text.indexOf(' '));
        const argument = text.slice(text.indexOf(' ')+1, );

        tools.database.getProfile(user).then( profile => {});

        switch(command){
            case 'setup':

            case 'update':
                // query db and retrieve metric [argument]
                    // if no profile exists send back link to form
                break;
            case 'delete':
                // if no argument send back "DELETE" argument request to user
                break;
        }

        res.json('test worked');
    }

    res.end('invalid Slack verification token');
});

router.post('/profile', (req, res) => {

    const body = req.body;

    if(tools.verify.slash(body.token)){
        const text = body.text;

        let argument,
            user;

    }

    console.log(req.body);
    res.json('got it');
});

router.post('/checkin', (req, res) => {

    const body = req.body;

    let valueObject = {};
    valueObject.partners = body.text.replace(/\@/g, '').split(' ');
    valueObject.partners.push(body.user_name);

    if(tools.verify.slash(body.token)){
        res.json(tools.interactive.interaction('checkin', valueObject));
    }else{
        // res.json('invalid Slack token checkin');
    }


});

// ------------ INTERACTIVE MESSAGES ---------------- //

// used to handle interactive message responses / submissions
router.post('/interactive', (req, res) => {

    const payload = JSON.parse(req.body.payload);

    if(tools.verify.slash(payload.token)){
        res.json(tools.interactive.process(payload));
    }

});

// used to load options for interactive messages
router.post('/options', (req, res) => {
    console.log(req.body);
    res.json('worked');
});



