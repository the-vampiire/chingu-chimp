/**
 * Created by Vampiire on 8/12/17.
 */


const express = require('express');
const router = module.exports = express.Router();


router.post('/', (req, res) => {

    const text = req.body.text;

    switch(text){
        case 'update help':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: `Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give`,
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: '1) Did you prefer version 1 or version 2?'
                    },
                    {
                        color: `#15df89`,
                        text: '2) Was the guide clear or is there anything you are still confused about?'
                    },
                    {
                        color: `#15df89`,
                        text: '3) Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
                    },
                    {
                        color: `#15df89`,
                        text: '4) Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@U5XJSS683|vampiire>`
                    },
                    {
                        mrkdwn_in: ['text', 'pretext'],
                        color: '#FF0000',
                        pretext: '*Next Step*',
                        text: `type \`/beta update command\``
                    }
                ]
            });
            break;
        case 'update command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: '1) Was the git-style interface intuitive / convenient to you or do you have an alternative approach to updating you would like to suggest?'
                    },
                    {
                        color: `#15df89`,
                        text: '2) Were the error messages clear and helpful in guiding you towards fixing your error?'
                    },
                    {
                        color: `#15df89`,
                        text: '3) Would you use the update command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#15df89`,
                        text: '4) Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@U5XJSS683|vampiire>`
                    },
                    {
                        color: '#FF0000',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/beta checkin command\``
                    }
                ]
            });
            break;
        case 'checkin command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: '1) Was the check-in process intuitive / convenient for you?'
                    },
                    {
                        color: `#15df89`,
                        text: '2) Is there any part of the check-in process that was confusing?'
                    },
                    {
                        color: `#15df89`,
                        text: '3) Is there any part of the check-in process that should be added / removed / changed?'
                    },
                    {
                        color: `#15df89`,
                        text: '4) Can you think of any other check-in types or activities to add to the lists? They should be (relatively) common and recurring activities'
                    },
                    {
                        color: `#15df89`,
                        text: '5) Would you use the check-in command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#15df89`,
                        text: '6) Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@U5XJSS683|vampiire>`
                    },
                    {
                        color: '#FF0000',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/beta profile help\``
                    }
                ]
            });
            break;
        case 'profile help':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: '1) Was the guide clear or is there anything you are still confused about?'
                    },
                    {
                        color: `#15df89`,
                        text: '2) Was the guide structured in an easily digestible way or can you suggest moving any items or changing the markdown?'
                    },
                    {
                        color: `#15df89`,
                        text: '3) Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@U5XJSS683|vampiire>`
                    },
                    {
                        color: '#FF0000',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/beta profile command\``
                    }
                ]
            });
            break;
        case 'profile command':
            res.json({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: 'Respond to the following questions by pressing the "start a thread" button on the top-right corner of this message.\n\nYes / no answers are fine but I would appreciate as much detail as you\'re willing to give',
                        thumb_url: 'http://i.imgur.com/ob9DN1P.png'
                    },
                    {
                        color: `#15df89`,
                        text: '1) Was the profile command intuitive / convenient for you?'
                    },
                    {
                        color: `#15df89`,
                        text: '2) If there were any error messages were they clear and helpful in guiding you towards fixing your error?'
                    },
                    {
                        color: `#15df89`,
                        text: '3) Is there anything missing from the profile command that you would like to see added?'
                    },
                    {
                        color: `#15df89`,
                        text: '4) Would you use the profile command in the future? If not, why? (you can be honest)'
                    },
                    {
                        color: `#666`,
                        text: '5) Any other suggestions / alternatives / complaints / bugs?'
                    },
                    {
                        pretext: '*Help*',
                        mrkdwn_in: ['text', 'pretext'],
                        text: `If you need help or clarification at any time message <@U5XJSS683|vampiire>`
                    },
                    {
                        color: '#FF0000',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done\` with no parameters`
                    }
                ]
            });
            break;
        case '':
            res.json({

                response_type: 'in_channel',
                attachments : [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Review*',
                        text: `If you have any other questions / suggestions / comments / complaints send a message to <@U5XJSS683|vampiire> in the Slack testing team.

Thank you for your help I really appreciate your time. If you ever need my help feel free to message me. I am up and coding most of the day and especially through the night.

\- Vamp`
                    },
                    {
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Optional - Break the Chimp*',
                        text: `Sign up to break the Chimp so weird bugs can be found and fixed before launching.\n\nThis will take about 30 minutes. For more details type \`/done chimp\``
                    }
                ]

            });
            break;
        case 'chimp':
            res.json({
                response_type: 'in_channel',
                text: '*Break The Chimp*',
                attachments: [
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Individual Sessions*',
                        text: `I expect some server crashing as a result of this area of testing.\n\nBecause of this I will need to schedule 15-30 minute (up to you on duration) individual sessions with anyone interested so it doesn't impact the rest of the beta testing.\n\nI will work on your schedule.`
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Task: break the `/update`, `/checkin`, and `/profile` commands*',
                        text: `please try _anything_ you can to break each of the commands\n
If you do not receive an error message for your attempt send a message in this channel with the command you entered and any additional notes.\n
If you break the command send a message in this channel with the command you entered and any additional notes.`
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Perks*',
                        text: `If you manage to break the Chimp you will be credited in the Chimp Breaker section of the readme.\n\nIf, in addition, you would like to work on a fix for the issue with me you will also receive a custom badge titled "I broke the Chimp and all I got was a 16px badge"`
                    },
                    {
                        mrkdwn_in: ['pretext', 'text'],
                        color: '#666',
                        pretext: '*Sign Up*',
                        text: `If you are interested message <@U5XJSS683|vampiire> to sign up`
                    }
                ]

            });
            break;
    }

});