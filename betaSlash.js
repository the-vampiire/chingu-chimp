/**
 * Created by Vampiire on 8/12/17.
 */

const express = require('express');
const router = module.exports = express.Router();


// ----------- REMOVE AFTER BETA TESTING ------------------------------//

router.post('/beta', (req, res) => {

    const text = req.body.text;

    switch(text){
        case 'start':
            res.json({
                response_type: 'in_channel',
                text: '*Closed Beta Test: Chingu Chimp*',
                attachments: [
                    {
                        mrkdwn_in: ['text', 'pretext'],
                        color: '#666',
                        pretext: '*Why Help?*',
                        fields: [
                            {
                                value: 'Early access to learning the ins and outs of the app and its features'
                            },
                            {
                                value: 'Contribute to improving a Chingu community tool'
                            },
                            {
                                value: 'Get a unique Beta Tester badge on your profile'
                            },
                            {
                                value: 'Get credited as a beta tester in the GitHub readme'
                            }
                        ]
                    },
                    {
                        mrkdwn_in: ['text', 'pretext'],
                        color: '#15df89',
                        pretext: '*Steps to Begin*',
                        text: `Create a profile <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>.\n*The username you use for your Chingu profile must match your username on Slack*\n\nCall your profile using \`/profile @yourUserName\` to confirm its creation\nIf you receive an error - message <@${req.body.user_id}|vampiire>`,
                    },
                    {
                        mrkdwn_in: ['text', 'pretext'],
                        color: '#666',
                        pretext: '*Next Step*',
                        text: `When you have created and confirmed your profile type \`/beta update help\``
                    }
                ]
            });
            break;
        case 'update help':
            res.json({
                response_type: 'in_channel',
                text: 'The Update Command',
                attachments: [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Learn how to use the `/update command`*',
                        text: `Call each of the help guides:\n\n*command:* \`/update help1\` for the first version\n\n*command:* \`/update help2\` for the second version`
                    },
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done update help\``
                    }
                ]
            });
            break;
        case 'update command':
            res.json({
                response_type: 'in_channel',
                text: 'The Update Command',
                attachments: [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Use the `/update command`*',
                        fields: [
                            {
                                title: 'Instructions',
                                value: 'Update your profile with one of each item using appropriate flags as needed'
                            },
                            {
                                title: 'List of update items',
                                value: 'blog, certifications, gitHub, picture, portfolio, projects, skills, story'
                            },
                            {
                                title: 'Note',
                                value: 'If you do not have information for an item you may skip it [:cry:] or put in dummy information [this can be deleted later]'
                            }

                        ]
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Notes*',
                        text: `if you make a mistake you should receive an error message explaining how to fix it.\n\nIf you don't receive an error response for your erroneous command send a message in this channel with the command you entered and any additional notes.\n\nif you forget which flags to use or the correct format you can call the sub-guide for that item at any time using \`/update [item]\``
                    },
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done update command\``
                    }
                ]
            });
            break;
        case 'checkin command':
            res.json({
                response_type: 'in_channel',
                text: 'The Check-in Command',
                attachments: [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Use the `/checkin` command*',
                        fields: [
                            {
                                title: 'Instructions',
                                value: 'Complete each of the steps below'
                            }

                        ]
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Call the check-in command for yourself*',
                        text: '*command:* `/checkin` with no parameters'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Call the check-in command with some partner(s)*',
                        text: '*command:* `/checkin [@partner1] [@partnerN]`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Soft Reset the Check-in Command*',
                        text: '*command:* `/checkin` with or without partners',
                        fields: [
                            {
                                title: 'Instructions',
                                value: 'When you get to the confirmation message choose reset'
                            },
                            {
                                value: 'Select different choices then submit'
                            },
                            {
                                title: 'Note',
                                value: 'A soft reset will keep the original partners but allow you to change your choice of check-in type and/or activity'
                            }
                        ]
                    },
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done checkin command\``
                    }
                ]
            });
            break;
        case 'profile help':
            res.json({
                response_type: 'in_channel',
                text: 'The Profile Command',
                attachments: [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Learn how to use the `/profile command`*',
                        text: `Call the help guide\n\n*command:* \`/profile help\``
                    },
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done profile help\``
                    }
                ]
            });
            break;
        case 'profile command':
            res.json({
                response_type: 'in_channel',
                text: 'The Profile Command',
                attachments: [
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Use the `/profile` command*',
                        fields: [
                            {
                                title: 'Instructions',
                                value: 'Complete each of the steps below'
                            }

                        ]
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's profile card privately - _without using_ the \`share\` argument*`,
                        text: '*command:* `/profile @userName`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's profile card publicly - _using_ the \`share\` argument*`,
                        text: '*command:* `/profile @userName share`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's gitHub, portfolio or blog link publicly - _using_ the \`share\` argument*`,
                        text: '*command:* `/profile @userName share [gitHub, portfolio, blog]`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's certifications - publicly or privately*`,
                        text: '*command:* `/profile @userName certifications`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's skills - publicly or privately*`,
                        text: '*command:* `/profile @userName skills`'
                    },
                    {
                        color: '#15df89',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: `*Request a user's completed projects - publicly or privately*`,
                        text: '*command:* `/profile @userName projects`'
                    },
                    {
                        color: '#666',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/done profile command\``
                    }
                ]
            });
            break;
    }

});


// ----------- REMOVE AFTER BETA TESTING ------------------------------//
