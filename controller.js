/**
 * Created by Vampiire on 7/2/17.
 *
 *
 * FOR ADDITIONAL SECURITY
 *      get list of all chingu team names (team ID's) and add them to the slash verify function
 *      to check alongside the slack token. ensures all requests only occur between chingu teams and bot
 *
 */

const express = require('express');
const router = module.exports = express.Router();

const tools = require('./tools/exporter');


// ------------------- SPLASH PAGE ------------------- //

router.get('/form', (req, res) => {

    res.render('form');

});

router.get('/', (req, res) => {

    let data = {
        userName : 'vampiire',

        portfolio : 'https://www.jessec.org',
        gitHub: 'https://www.github.com/jessec',
        blog: 'https://medium.com/@jessec',

        story: 'I am the story',

        joinDate: 4,

        cohort: [{
            cohortName : 'Walruses',
            startDate : 4
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
            url : 'https://www.jessec.org'
        }],

        certifications: [{
            name: 'Front End Certification'
        }]

    };


    const userProfile = require('./database/profileModel').userProfile;

    userProfile.addProfile(data);

    res.end('made a new profile');

    // userProfile.getProfile('vampiire').then( doc => console.log(doc.checkins[0].sessions));


});

// -------------------------------------------------- //


// ------------ INCOMING SLASH COMMANDS ------------- //

// ----- CHECK-IN ----- //
router.post('/checkin', (req, res) => {

    const body = req.body;
    const user = body.user_name;

    let valueObject = {};

// filter results to only pass @userName tags then strip the '@' symbol
    let filtered = body.text.split(' ').filter( e => /@[A-Za-z]+/g.test(e));
    filtered.forEach( (e, i, a) => a[i] = e.replace(/\@/g, ''));

// inject the filtered and stripped partners array into the valueObject
    valueObject.partners = filtered;
// inject the user calling the checkin so they dont have to tag themselves
    valueObject.partners.push(user);

    if(tools.verify.slash(body.token)) res.json(tools.interactive.interaction('checkin', valueObject));
    else res.end('invalid Slack token');



});

// ----- DISPLAY PROFILE / ITEM ----- //
router.post('/profile', (req, res) => {

    const body = req.body;
    const text = body.text;

    if(tools.verify.slash(body.token)){

        if(!text || text === 'help'){
            // send back help response
        }

        if(text) {
            if (/^\@[A-Za-z]+( share)?$/.test(text)) {
                if (~text.indexOf(' ')) {
                    let userName = text.slice(0, text.indexOf(' '));
                    share = true;
                    // call / return profile builder
                }
                else {
                    let userName = text.replace(/@/, '');
                    tools.respond.profileCard(userName).then( response => res.json(response));
                    // call / return profile builder
                }
            }

            else res.send(`[\`${text}\`] is not a valid username.
            try again with the format \`/update @userName [share]\`
            you may only call one profile look-up at a time`);
        }
    }
    else res.end('invalid Slack token');

});

// ----- UPDATE PROFILE ----- //
router.post('/update', (req, res) => {

    const respond = require('./tools/respond');
    const update = require('./tools/update');
    const userProfile = require('./database/profileModel').userProfile;

    const body = req.body;
    const userName = body.user_name;
    const cohortName = body.team_domain;
    const arguments = body.text;

    if(tools.verify.slash(body.token)){
        if(~arguments.indexOf(' ')){
            let parserOutput = update.parse(arguments);

            if(typeof parserOutput === 'string') res.end(parserOutput);
            else userProfile.processUpdate(userName, cohortName, parserOutput).then( response => res.end(response));

        }

        else{
            if(!arguments) res.send(respond.helpResponse('help'));
            if(arguments === 'aptitudes'){
                res.json(tools.interactive.interaction('update'));
            }
            if(arguments === 'picture'){
                const userID = body.user_id;
                const userProfile = require('./database/profileModel').userProfile;

                tools.requests.userData('pic', userID).then( picObject => {
                    let data = { item: 'profilePic', updateData : picObject };
                    userProfile.processUpdate(userName, cohortName, data).then( response => res.end(response));
                });
            }
            else res.end(respond.helpResponse(arguments));
        }
    }

    else res.end('invalid Slack token');

});

// ------------ INTERACTIVE MESSAGES ---------------- //

// used to handle interactive message responses / submissions
router.post('/interactive', (req, res) => {

    const payload = JSON.parse(req.body.payload);

    if(tools.verify.slash(payload.token)){
        let output = tools.interactive.process(payload);

        if(output instanceof Promise) output.then( response => res.end(response));
        else res.json(output);
    }

    else res.end('invalid Slack token');

});

// used to load options for interactive messages
router.post('/options', (req, res) => {
    console.log(req.body);
    res.json('worked');
});


// ------------ INCOMING API CALLS ---------------- //



