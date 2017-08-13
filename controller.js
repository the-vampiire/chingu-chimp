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


// // -------------------------------------- BACK END --------------------------------------- //
//
//
// // ------------ INCOMING SLASH COMMANDS ------------- //
//
//
// // ----------- REMOVE AFTER BETA TESTING ------------------------------//
//
// router.post('/beta', (req, res) => {
//
//     const text = req.body.text;
//
//     switch(text){
//         case 'start':
//             res.json({
//                 response_type: 'in_channel',
//                 text: '*Closed Beta Test: Chingu Chimp*',
//                 attachments: [
//                     {
//                         mrkdwn_in: ['text', 'pretext'],
//                         color: '#666',
//                         pretext: '*Why Help?*',
//                         fields: [
//                             {
//                                 value: 'Early access to learning the ins and outs of the app and its features'
//                             },
//                             {
//                                 value: 'Contribute to improving a Chingu community tool'
//                             },
//                             {
//                                 value: 'Get a unique Beta Tester badge on your profile'
//                             },
//                             {
//                                 value: 'Get credited as a beta tester in the GitHub readme'
//                             }
//                         ]
//                     },
//                     {
//                         mrkdwn_in: ['text', 'pretext'],
//                         color: '#15df89',
//                         pretext: '*Steps to Begin*',
//                         text: `Create a profile <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>.\n*The username you use for your Chingu profile must match your username on Slack*\n\nCall your profile using \`/profile @yourUserName\` to confirm its creation\nIf you receive an error - message <@${req.body.user_id}|vampiire>`,
//                     },
//                     {
//                         mrkdwn_in: ['text', 'pretext'],
//                         color: '#666',
//                         pretext: '*Next Step*',
//                         text: `When you have created and confirmed your profile type \`/beta update help\``
//                     }
//                 ]
//             });
//             break;
//         case 'update help':
//             res.json({
//                 response_type: 'in_channel',
//                 text: 'The Update Command',
//                 attachments: [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Learn how to use the `/update command`*',
//                         text: `Call each of the help guides:\n\n*command:* \`/update help1\` for the first version\n\n*command:* \`/update help2\` for the second version`
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done update help\``
//                     }
//                 ]
//             });
//             break;
//         case 'update command':
//             res.json({
//                 response_type: 'in_channel',
//                 text: 'The Update Command',
//                 attachments: [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Use the `/update command`*',
//                         fields: [
//                             {
//                                 title: 'Instructions',
//                                 value: 'Update your profile with one of each item using appropriate flags as needed'
//                             },
//                             {
//                                 title: 'List of update items',
//                                 value: 'blog, certifications, gitHub, picture, portfolio, projects, skills, story'
//                             },
//                             {
//                                 title: 'Note',
//                                 value: 'If you do not have information for an item you may skip it [:cry:] or put in dummy information [this can be deleted later]'
//                             }
//
//                         ]
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Notes*',
//                         text: `if you make a mistake you should receive an error message explaining how to fix it.\n\nIf you don't receive an error response for your erroneous command send a message in this channel with the command you entered and any additional notes.\n\nif you forget which flags to use or the correct format you can call the sub-guide for that item at any time using \`/update [item]\``
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done update command\``
//                     }
//                 ]
//             });
//             break;
//         case 'checkin command':
//             res.json({
//                 response_type: 'in_channel',
//                 text: 'The Check-in Command',
//                 attachments: [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Use the `/checkin` command*',
//                         fields: [
//                             {
//                                 title: 'Instructions',
//                                 value: 'Complete each of the steps below'
//                             }
//
//                         ]
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Call the check-in command for yourself*',
//                         text: '*command:* `/checkin` with no parameters'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Call the check-in command with some partner(s)*',
//                         text: '*command:* `/checkin [@partner1] [@partnerN]`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Soft Reset the Check-in Command*',
//                         text: '*command:* `/checkin` with or without partners',
//                         fields: [
//                             {
//                                 title: 'Instructions',
//                                 value: 'When you get to the confirmation message choose reset'
//                             },
//                             {
//                                 value: 'Select different choices then submit'
//                             },
//                             {
//                                 title: 'Note',
//                                 value: 'A soft reset will keep the original partners but allow you to change your choice of check-in type and/or activity'
//                             }
//                         ]
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done checkin command\``
//                     }
//                 ]
//             });
//             break;
//         case 'profile help':
//             res.json({
//                 response_type: 'in_channel',
//                 text: 'The Profile Command',
//                 attachments: [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Learn how to use the `/profile command`*',
//                         text: `Call the help guide\n\n*command:* \`/profile help\``
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done profile help\``
//                     }
//                 ]
//             });
//             break;
//         case 'profile command':
//             res.json({
//                 response_type: 'in_channel',
//                 text: 'The Profile Command',
//                 attachments: [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Use the `/profile` command*',
//                         fields: [
//                             {
//                                 title: 'Instructions',
//                                 value: 'Complete each of the steps below'
//                             }
//
//                         ]
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's profile card privately - _without using_ the \`share\` argument*`,
//                         text: '*command:* `/profile @userName`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's profile card publicly - _using_ the \`share\` argument*`,
//                         text: '*command:* `/profile @userName share`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's gitHub, portfolio or blog link publicly - _using_ the \`share\` argument*`,
//                         text: '*command:* `/profile @userName share [gitHub, portfolio, blog]`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's certifications - publicly or privately*`,
//                         text: '*command:* `/profile @userName certifications`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's skills - publicly or privately*`,
//                         text: '*command:* `/profile @userName skills`'
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: `*Request a user's completed projects - publicly or privately*`,
//                         text: '*command:* `/profile @userName projects`'
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done profile command\``
//                     }
//                 ]
//             });
//             break;
//     }
//
// });
//
// router.post('/done', (req, res) => {
//
//     const text = req.body.text;
//
//     switch(text){
//         case 'update help':
//             res.json({
//                 response_type: 'in_channel',
//                 attachments: [
//                     {
//                         text: `Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give`,
//                         thumb_url: 'http://i.imgur.com/ob9DN1P.png'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Did you prefer version 1 or version 2?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the guide clear or is there anything you are still confused about?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Any other suggestions / alternatives / complaints / bugs?'
//                     },
//                     {
//                         pretext: '*Help*',
//                         mrkdwn_in: ['text', 'pretext'],
//                         text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
//                     },
//                     {
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/beta update command\``
//                     }
//                 ]
//             });
//             break;
//         case 'update command':
//             res.json({
//                 response_type: 'in_channel',
//                 attachments: [
//                     {
//                         text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
//                         thumb_url: 'http://i.imgur.com/ob9DN1P.png'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the git-style interface intuitive / convenient to you or do you have an alternative approach to updating you would like to suggest?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Were the error messages clear and helpful in guiding you towards fixing your error?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Would you use the update command in the future? If not, why? (you can be honest)'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Any other suggestions / alternatives / complaints / bugs?'
//                     },
//                     {
//                         pretext: '*Help*',
//                         mrkdwn_in: ['text', 'pretext'],
//                         text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/beta checkin command\``
//                     }
//                 ]
//             });
//             break;
//         case 'checkin command':
//             res.json({
//                 response_type: 'in_channel',
//                 attachments: [
//                     {
//                         text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
//                         thumb_url: 'http://i.imgur.com/ob9DN1P.png'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the check-in process intuitive / convenient for you?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Is there any part of the check-in process that was confusing?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Is there any part of the check-in process that should be added / removed / changed?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Can you think of any other check-in types or activities to add to the lists? They should be (relatively) common and recurring activities'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Would you use the check-in command in the future? If not, why? (you can be honest)'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Any other suggestions / alternatives / complaints / bugs?'
//                     },
//                     {
//                         pretext: '*Help*',
//                         mrkdwn_in: ['text', 'pretext'],
//                         text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/beta profile help\``
//                     }
//                 ]
//             });
//             break;
//         case 'profile help':
//             res.json({
//                 response_type: 'in_channel',
//                 attachments: [
//                     {
//                         text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
//                         thumb_url: 'http://i.imgur.com/ob9DN1P.png'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the guide clear or is there anything you are still confused about?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Any other suggestions / alternatives / complaints / bugs?'
//                     },
//                     {
//                         pretext: '*Help*',
//                         mrkdwn_in: ['text', 'pretext'],
//                         text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/beta profile command\``
//                     }
//                 ]
//             });
//             break;
//         case 'profile command':
//             res.json({
//                 response_type: 'in_channel',
//                 attachments: [
//                     {
//                         text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
//                         thumb_url: 'http://i.imgur.com/ob9DN1P.png'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Was the profile command intuitive / convenient for you?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'If there were any error messages were they clear and helpful in guiding you towards fixing your error?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Is there anything missing from the profile command that you would like to see added?'
//                     },
//                     {
//                         color: `#15df89`,
//                         text: 'Would you use the profile command in the future? If not, why? (you can be honest)'
//                     },
//                     {
//                         color: `#666`,
//                         text: 'Any other suggestions / alternatives / complaints / bugs?'
//                     },
//                     {
//                         pretext: '*Help*',
//                         mrkdwn_in: ['text', 'pretext'],
//                         text: `If you need help or clarification at any time message <@${req.body.user_id}|vampiire>`
//                     },
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Next Step*',
//                         text: `type \`/done\` with no parameters`
//                     }
//                 ]
//             });
//             break;
//         case '':
//             res.json({
//
//                 response_type: 'in_channel',
//                 attachments : [
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Review*',
//                         text: `If you have any other questions / suggestions / comments / complaints send a message to <@${req.body.user_id}|vampiire> in the Slack testing team.
//
// Thank you for your help I really appreciate your time. If you ever need my help feel free to message me. I am up and coding most of the day and especially through the night.
//
// \- Vamp`
//                     },
//                     {
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Optional - Break the Chimp*',
//                         text: `Sign up to break the Chimp so weird bugs can be found and fixed before launching.\n\nThis will take about 30 minutes. For more details type \`/done chimp\``
//                     }
//                 ]
//
//             });
//             break;
//         case 'chimp':
//             res.json({
//                 response_type: 'in_channel',
//                 text: '*Break The Chimp*',
//                 attachments: [
//                     {
//                         color: '#666',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Individual Sessions*',
//                         text: `I expect some server crashing as a result of this area of testing.\n\nBecause of this I will need to schedule 15-30 minute (up to you on duration) individual sessions with anyone interested so it doesn't impact the rest of the beta testing.\n\nI will work on your schedule.`
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Task: break the `/update`, `/checkin`, and `/profile` commands*',
//                         text: `please try _anything_ you can to break each of the commands\n
// If you do not receive an error message for your attempt send a message in this channel with the command you entered and any additional notes.\n
// If you break the command send a message in this channel with the command you entered and any additional notes.`
//                     },
//                     {
//                         color: '#15df89',
//                         mrkdwn_in: ['text', 'pretext'],
//                         pretext: '*Perks*',
//                         text: `If you manage to break the Chimp you will be credited in the Chimp Breaker section of the readme.\n\nIf, in addition, you would like to work on a fix for the issue with me you will also receive a custom badge titled "I broke the Chimp and all I got was a 16px badge"`
//                     },
//                     {
//                         mrkdwn_in: ['pretext', 'text'],
//                         color: '#666',
//                         pretext: '*Sign Up*',
//                         text: `If you are interested message <@${req.body.user_id}|vampiire> to sign up`
//                     }
//                 ]
//
//             });
//             break;
//     }
//
// });
//
// // ----------- REMOVE AFTER BETA TESTING ------------------------------//

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
        // inject the user calling the checkin so they don't have to tag themselves
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
            res.json(profileResponse.profileHelp());
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



