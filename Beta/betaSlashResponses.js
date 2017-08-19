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
                    }
                ]
            },
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/beta profile help\``
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
                text: `type \`/beta done\` with no other parameters`
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
                text: `If you want to review the code or have any suggestions / complaints / bugs / want to help - you can raise an issue on at the <https://github.com/the-vampiire/chingu-chimp|GitHub Repo>.`
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
    doneResponse
};