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


// -------------------------------------- FRONT END -------------------------------------- //

router.post ('/create-profile', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.addProfile(req.body.userData);

    res.json({userCreated: true})
});

router.post('/validate-username', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;

    let userNameAvailable;
    userProfile.find({userName : req.body.userName})
        .then( user => {
            userNameAvailable = user.length > 0 ? false : true;
            res.json({userNameAvailable});
        })
        .catch( err => console.log(err));
});


// -------------------------------------- BACK END --------------------------------------- //


// ------------ INCOMING SLASH COMMANDS ------------- //


// ----------- REMOVE AFTER BETA TESTING ------------------------------//

router.post('/done', (req, res) => {

    console.log(req.body);

    const text = req.body.text;

    switch(text){
        case 'update help':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message. Yes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: 'Did you prefer version 1 or version 2?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the guide clear or is there anything you are still confused about?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
                    }
                ]
            });
            break;
        case 'update command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message. Yes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the git-style interface intuitive / convenient to you or do you have an alternative approach to updating you would like to suggest?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Were the error messages clear and helpful in guiding you towards fixing your error?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Would you use the update command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#15df89`,
                        text: 'Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
                    }
                ]
            });
            break;
        case 'checkin command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message. Yes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the check-in process intuitive / convenient for you?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Is there any part of the check-in process that was confusing?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Is there any part of the check-in process that should be added / removed / changed?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Can you think of any other check-in types or activities to add to the lists? They should be (relatively) common and recurring activities'
                    },
                    {
                        color: `#15df89`,
                        text: 'Would you use the check-in command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#15df89`,
                        text: 'Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
                    }
                ]
            });
            break;
        case 'profile help':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message. Yes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the guide clear or is there anything you are still confused about?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
                    }
                ]
            });
            break;
        case 'profile command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message. Yes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: 'Was the profile command intuitive / convenient for you?'
                    },
                    {
                        color: `#15df89`,
                        text: 'If there were any error messages were they clear and helpful in guiding you towards fixing your error?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Is there anything missing from the profile command that you would like to see added?'
                    },
                    {
                        color: `#15df89`,
                        text: 'Would you use the profile command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#666`,
                        text: 'Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
                    }
                ]
            });
            break;
    }

});

// ----------- REMOVE AFTER BETA TESTING ------------------------------//

// ----- CHECK-IN ----- //
router.post('/checkin', (req, res) => {

    const body = req.body;

    if(tools.verify.slash(body.token)) {

        if(!body.text || /^(@[0-9A-Za-z-_.]+( )?)+$/.test(body.text)){
            const user = body.user_name;

            let valueObject = {};

        // filter results to only pass @userName tags then strip the '@' symbol
            let filtered = body.text.split(' ').filter( e => /@[0-9A-Za-z-_.]+/g.test(e));
            filtered.forEach( (e, i, a) => a[i] = e.replace(/\@/g, ''));

        // inject the filtered and stripped partners array into the valueObject
            valueObject.partners = filtered;
        // inject the user calling the checkin so they dont have to tag themselves
            valueObject.partners.push(user);

            res.json(tools.interactive.interaction('checkin', valueObject));
        }
        else res.end('*Invalid checkin command format. Try `/checkin [@userName] [@otherUserName(s)]`. you do not need to tag yourself, the user calling the check-in command is automatically included*');


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
            res.end(profileResponse.profileHelp());
        }

        if(text) {
            if (/^\@[0-9A-Za-z-_.]+( share)?( (story|projects|skills|certifications|gitHub|blog|portfolio|))?$/.test(text)) {

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


                if(item) profileResponse.profileItem(userName, item, share).then( response => typeof response === 'string' ?
                    res.end(response) : res.json(response));
                else profileResponse.profileCard(userName, share).then( response => res.json(response));

            }

            else res.end(`[\`${text}\`] is not a valid username.
            try again with the format \`/profile <@userName> [share] [profile item]\`
            you may only call one profile look-up at a time`);
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
            let parserOutput = argumentParser.parse(arguments);

            if(typeof parserOutput === 'string') res.end(parserOutput);
            else userProfile.processUpdate(userName, cohortName, parserOutput).then( response => res.end(response));

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



