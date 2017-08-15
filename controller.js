/**
 * Created by Vampiire on 7/2/17.
 *
 *
 * FOR ADDITIONAL SECURITY
 *      get list of all chingu team names (team ID's) and add them to the slash verify function
 *      to check alongside the slack token. ensures all requests only occur between chingu teams and bot
 *
 *      // userid: U5XJSS683, username: vampiire
 *      // teamid: T5YFJ3Y7Q, team name: test team
 *
 */


const express = require('express');
const router = module.exports = express.Router();

const tools = require('./tools/exporter');


// -------------------------------------- FRONT END -------------------------------------- //

router.post ('/create-profile', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.addProfile(req.body.userData);

    res.json({userCreated: true})
});

router.post('/validate-username', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.getProfile(req.body.userName).then( user => res.send(!user));
});


// -------------------------------------- BACK END --------------------------------------- //

// ----- CHECK-IN ----- //
router.post('/checkin', (req, res) => {

    const body = req.body;

    if(tools.verify.slash(body.token)) {

        if(!body.text || /^(@[0-9A-Za-z-_.]+( )?)+$/.test(body.text)){
            const user = body.user_name;

            let valueObject = {};

        // split the arguments and inject the user name of the user calling the check-in
            // filter duplicates
            // strip the '@' symbol
            let filtered = body.text.split(' ');
            filtered.push('@vampiire');
            filtered = filtered.filter( (e, i, a) => /@[0-9A-Za-z-_.]+/g.test(e) && a.indexOf(e) === i);
            filtered.forEach( (e, i, a) => a[i] = e.replace(/\@/g, ''));

            // /@[0-9A-Za-z-_.]+/g.test(e) &&

            console.log(filtered);

        // set the partners property of the valueObject to the now filtered array of partner(s)
            valueObject.partners = filtered;

            res.json(tools.interactive.interaction('checkin', valueObject));
        }
        else res.end('*Invalid checkin command format. Try `/checkin [@userName] [@otherUserName(s)]`. You do not need to tag yourself, the user calling the check-in command is automatically included*');


    }
    else res.end('invalid Slack token');

});

// ----- DISPLAY PROFILE / ITEM ----- //
router.post('/profile', (req, res) => {

    const body = req.body;
    const text = body.text;

    if(tools.verify.slash(body.token)){

        const profileResponse = require('./responses/profileResponses');

        if(text === 'help' || !text){
            res.json(profileResponse.profileHelp());
        }

        if(text) {
            if (/^\@[0-9A-Za-z-_.]+( share)?( (story|projects|skills|certifications|(gitHub|github)|blog|portfolio|badges))?$/.test(text)) {

                let share = false;
                let item;

                const arguments = text.split(' ');
                let userName = arguments[0].replace(/@/, '');

                if(arguments[1]){
                    if(~arguments[1].indexOf('share')){
                        share = true;
                        if(arguments[2]) item = arguments[2];
                    }
                    else item = arguments[1];
                }
            // accept lowercase but process downstream in camelcase
                if(item === 'github') item = 'gitHub';

                if(item) profileResponse.profileItem(userName, item, share).then( response => res.json(response) );
                else profileResponse.profileCard(userName, share).then( response => res.json(response));

            }

            else res.end(`[\`${text}\`] is not a valid profile request.\nTry again with the format \`/profile <@userName> [share] [profile item]\` or try \`/profile help\``);
        }
    }
    else res.end('invalid Slack token');

});

// ----- UPDATE PROFILE ----- //
router.post('/update', (req, res) => {

    const updateResponse = require('./responses/updateResponses');
    const argumentParser = require('./tools/argumentParser');
    const userProfile = require('./database/profileModel').userProfile;

    const body = req.body;
    const userName = body.user_name;
    const cohortName = body.team_domain;
    const arguments = body.text;

    if(tools.verify.slash(body.token)){
        if(~arguments.indexOf(' ')){

            if(/^(skills .+)/.test(arguments)) res.end('*\`/update skills\` does not take any additional parameters*');
            else if(/^(picture .+)/.test(arguments)) res.end('*\`/update picture\` does not take any additional parameters*');

            else{
                let parserOutput = argumentParser.parse(arguments);

                if(typeof parserOutput === 'string') res.end(parserOutput);
                else userProfile.processUpdate(userName, cohortName, parserOutput).then( response => res.end(response));
            }
        }

        else{
            if(arguments === 'help' || !arguments) {
                const helpResponse = updateResponse.helpResponse('help');
                if(typeof helpResponse === 'string') res.end(helpResponse);
                else res.json(helpResponse);
            }

            else if(arguments === 'skills'){
                const output = tools.interactive.interaction(('update'));
                if(output instanceof Promise) output.then( response => {
                    if(typeof response === 'string') res.end(response);
                    else res.json(response);
                });
                else res.json(output);
            }

            else if(arguments === 'picture'){
                const userID = body.user_id;
                const userProfile = require('./database/profileModel').userProfile;

                tools.requests.userData('pic', userID).then( picObject => {
                    let data = { item: 'profilePic', updateData : picObject };
                    userProfile.processUpdate(userName, cohortName, data).then( response => res.end(response));
                });
            }
            else {
                const helpResponse = updateResponse.helpResponse(arguments);
                if(typeof helpResponse === 'string') res.end(helpResponse);
                else res.json(helpResponse);
            }
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

        if(output instanceof Promise) output.then( response => {
            if(typeof response === 'string') res.end(response);
            else res.json(response);
        });
        else res.json(output);
    }

    else res.end('invalid Slack token');

});

// ------------ INCOMING API CALLS ---------------- //



