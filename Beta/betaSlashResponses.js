/**
 * Created by Vampiire on 8/13/17.
 */



/*
*
*
* ADD SOME INFORMATION ABOUT CHECK-INS AND WHAT THEY WILL BE USED FOR
*
* */

startResponse = () => {
    return {
        response_type: 'in_channel',
        text: '*Closed Beta Test: Chingu Chimp*',
        attachments: [
            // {
            //     mrkdwn_in: ['text', 'pretext'],
            //     color: '#666',
            //     pretext: '*Why Help?*',
            //     fields: [
            //         {
            //             value: 'Early access to learning the ins and outs of the app and its features'
            //         },
            //         {
            //             value: 'Contribute to improving a Chingu community tool'
            //         },
            //         {
            //             value: 'Get a unique Beta Tester badge on your profile'
            //         },
            //         {
            //             value: 'Get credited as a beta tester in the GitHub readme'
            //         }
            //     ]
            // },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Steps to Begin*',
                text: `1) Create a profile <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>.\n*The username you use for your Chingu profile must match your username on Slack*\n\n2) Call your profile using \`/profile @yourUserName\` to confirm its creation\nIf you receive an error - message <@U5XJSS683|vampiire>`,
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#FF0000',
                pretext: '*Next Step*',
                text: `When you have created and confirmed your profile type \`/beta update help\``
            }
        ]
    }
};

updateHelpResponse = () => {
    return {
        response_type: 'in_channel',
        text: 'The Update Command',
        attachments: [
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Learn how to use the `/update command`*',
                text: `*Call the help guide \`/update help\`*`
            },
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/beta update command\``
            }
        ]
    }
};

updateCommandResponse = () => {
    return {
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
                        value: 'Try updating any of the following profile items'
                    },
                    {
                        title: 'List of update items',
                        value: 'blog, certifications, gitHub, picture, portfolio, projects, skills, story'
                    }

                ]
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Notes*',
                text: `if you make a mistake you should receive an error message explaining how to fix it.\n\nif you forget which flags to use or the correct format you can call the sub-guide for that item at any time using \`/update [item]\``
            },
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/beta checkin command\``
            }
        ]
    }
};

checkinCommandResponse = () => {
    return {
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
                pretext: '*1) Call the check-in command for yourself*',
                text: '*command:* `/checkin` with no parameters'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*2) Call the check-in command with some partner(s)*',
                text: 'You can tag anyone else from the channel to test this feature.\n\n*command:* `/checkin [@partner1] [@partnerN]`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*3) Soft Reset and Cancel the Check-in Command*',
                text: '*command:* `/checkin` with or without partners',
                fields: [
                    {
                        title: 'Instructions',
                        value: 'When you get to the confirmation message choose reset'
                    },
                    {
                        value: 'Select different choices. You should see the new selections at the confirmation window. Now press cancel to cancel the check-in'
                    },
                    {
                        title: 'Note',
                        value: 'A soft reset will keep the original partners but allow you to change your choice of check-in type and/or activity. If you want to change the partners use the cancel button then issue a new check-in command'
                    },
                    {
                        color: '#FF0000',
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Next Step*',
                        text: `type \`/beta profile help\``
                    }
                ]
            }
        ]
    }
};


profileHelpResponse = () => {
    return {
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
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/beta profile command\``
            }
        ]
    }
};

profileCommandResponse = () => {
    return {
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
                pretext: `*1) Request a user's profile card privately - _without using_ the \`share\` argument*`,
                text: '*command:* `/profile @userName`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: `*2) Share a user's profile card publicly - _using_ the \`share\` argument*`,
                text: '*command:* `/profile @userName share`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: `*3) Share a user's gitHub, portfolio or blog link publicly - _using_ the \`share\` argument*`,
                text: '*command:* `/profile @userName share [gitHub, portfolio, blog]`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: `*4) Request a user's story - stories default to private responses*`,
                text: '*command:* `/profile @userName story`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: `*5) Request a user's skills - publicly or privately*`,
                text: '*command:* `/profile @userName skills`'
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: `*6) Request a user's completed projects - publicly or privately*`,
                text: '*command:* `/profile @userName projects`'
            },
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/done\` with no other parameters`
            }
        ]
    }
};

doneResponse = () => {
    return {

        response_type: 'in_channel',
        attachments : [
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Review*',
                text: `If you have any other questions / suggestions / comments / complaints send a message to <@U5XJSS683|vampiire>. If you would like to review the code here is the <https://github.com/the-vampiire/chingu-chimp|GitHub Repo>.\n\nThank you for your help I really appreciate your time. If you ever need my help feel free to message me. I am up and coding most of the day and especially through the night.\n\n\- Vamp`
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Optional - Break the Chimp*',
                text: `Sign up to break the Chimp so weird bugs can be found and fixed before launching.\n\nThis will take about 30+ minutes. For more details type \`/done chimp\``
            }
        ]

    }
};

chimpResponse = () => {
    return {
        response_type: 'in_channel',
        text: '*Break The Chimp*',
        attachments: [
            {
                color: '#666',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Individual Sessions*',
                text: `I expect some server crashing as a result of this area of testing.\n\nBecause of this I will need at least 30 minutes (up to you on duration) individual sessions with anyone interested so it doesn't impact the rest of the beta testing.`
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
                text: `If you are interested message @vampiire to sign up`
            }
        ]

    }
};


module.exports = {
    startResponse,
    updateHelpResponse,
    updateCommandResponse,
    checkinCommandResponse,
    profileHelpResponse,
    profileCommandResponse,
    doneResponse,
    chimpResponse
};