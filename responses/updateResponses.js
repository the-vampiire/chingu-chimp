/**
 * Created by Vampiire on 8/9/17.
 */

const val = require('../tools/valStringer');

updateSkillsResponse = () => {
    let response = {
        text: 'Add or update your skills \nAdd a new skill or select an existing one and submit an updated skill level'
    };

    return response;
};

skillSelect = valueObject => {
    let response = updateSkillsResponse();
    response.attachments = [val.menu( null, valueObject, ['languages', 'frameworks'],
        'Select a skill to add or update', 'skillSelect', 'skill')];
    return response;
};

languageSelect = valueObject => {
    // csv repo https://github.com/jamhall/programming-languages-csv/blob/master/languages.csv
    // set the languages array to the database array of languages used in the dropdown menus of the profile form

    const languages = ['JavaScript', 'Java', 'Python', 'Ruby', 'C++', 'C#.Net', 'Assembly', 'Bash', 'Basic', 'C', 'C#',
        'Fortran', 'Go', 'MATLAB', 'Objective-C', 'Perl', 'PHP', 'Powershell', 'VBA'];

    let response = updateSkillsResponse();
    response.attachments = [val.menu( null, valueObject, languages, 'Select a language', 'languageSelect', 'name')];
    return response;
};

frameworkSelect = valueObject => {
    // set the frameworks array to the database array of frameworks used in the dropdown menus of the profile form

    const frameworks = ['jQuery', 'Bootstrap', 'Angular2/4', 'AngularJS', 'Electron', 'jQueryUI', 'React', 'React Native', 'Vue'];

    let response = updateSkillsResponse();
    response.attachments = [val.menu( null, valueObject, frameworks, 'Select a framework', 'frameworkSelect', 'name')];
    return response;
};

levelSelect = valueObject => {
    const levels = ['novice', 'intermediate', 'expert', 'wizard'];
    let response = updateSkillsResponse();
    response.attachments = [val.menu( null, valueObject, levels, 'Select your skill level', 'levelSelect', 'level')];
    return response;
};

submitSkill = valueObject => {
    valueObject = JSON.parse(valueObject);
    return valSubmit(valueObject, 'skill', true, `You have selected *${valueObject.name}* at the *${valueObject.level}* skill level`);
};

helpResponse = (type) => {

    const help1 = `*How to use the \`/update\` command:* \n\nUpdating functions similarly to git in stringing together mandatory and/or optional \`[-flag data]\` pairs to build the update command\n
        *General form: \`/update [profile item] [-flag data]\`*\n
        *List of update items: \`blog\`, \`certifications\`, \`gitHub\`, \`picture\`, \`portfolio\`, \`projects\`, \`skills\`, \`story\`*\n
        *List of update flags: \`-date\` or \`-d\`, \`-git\` or \`-g\`, \`-name\` or \`-n\`, \`-url\` or \`-u\`*\n\n
        *Updating Blog, Portfolio, or GitHub Profile Links*\n
        \t\`/update blog\` or \`/update portfolio\` or \`/update gitHub\`\n
        *Updating Certifications*\n
        \t\`/update certifications\`\n
        *Updating Projects*\n
        \t\`/update projects\`\n
         *Updating Skills*\n
        \t\`/update skills\`\n
        *Updating User Story*
        \t*Item(s)*
        \t\t[\`story\`]: your user story (that you entered in the Intro channel)
        \t*Flag(s)*
        \t\tNone. 
        \t\t*Note:* You can preserve the formatting [markdown] by copying directly from the edit message window in your intro post
        \t_example update of user story:_ \`/update story Hello you can call me Vamp I am a...\`
        \n
        *Updating Your Profile Picture*
        \t*Item(s)*
        \t\t[\`picture\`]: the profile picture that is displayed on your profile card
        \t*Flag(s)*
        \t\tNone.
        \tUse the command \`/update picture\` and your current Slack profile picture will be added to your profile card.
        
        *if you need more help, have suggestions for improvement, or want to report a bug please add an issue on <https://www.github.com/the-vampiire/Chingu-Chimp/issues|GitHub>*\n\n*Next:* call the second help version using \`/update help2\``;
    // ----------- REMOVE LAST "NEXT" LINE AFTER BETA -----------------

    const help2 = {
        text: `*How to use the \`/update\` command:* \n\nUpdating functions similarly to git in stringing together mandatory and/or optional \`[-flag data]\` pairs to build the update command`,
        response_type: 'ephemeral',

        attachments: [

            {
                color: '#666',
                mrkdwn_in: ['text', 'pretext'],
                text: `*\`blog\`, \`certifications\`, \`gitHub\`, \`picture\`, \`portfolio\`, \`projects\`, \`skills\`, \`story\`*`,
                pretext: '*List of update items*',
            },
            {
                color: '#666',
                mrkdwn_in: ['text', 'pretext'],
                text: `*\`-date\`, \`-git\`, \`-name\`, \`-url\`*\n*All of the flags can also be written shorthand: \`-d\`, \`-g\`, \`-n\`, \`-u\`*`,
                pretext: '*List of update flags*',
            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Updating User Story*',
                fields: [
                    {
                        title: 'Item',
                        value: `[story]: your user story (that you entered in the Intro channel)`
                    },
                    {
                        title: 'Flag(s)',
                        value: `None.\nNote: You can preserve the Slack markdown formatting by copying directly from the edit message window in your intro post`,
                    },
                    // {
                    //     title: 'Example - updating your user story',
                    //     value: `/update story Hello you can call me Vamp I am a...`
                    // }
                ]
            },
            {

                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                text: `*Example - updating your user story*\nUse the command \`/update story *Hello* you can call me _Vamp_ I am a...\``

            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Updating Profile Picture*',
                fields: [
                    {
                        title: 'Item',
                        value: `[picture]: the profile picture that is displayed on your profile card`
                    },
                    {
                        title: 'Flag(s)',
                        value: `None.\nNote: Your current Slack profile picture will be attached to your Chingu Profile Card`,
                    // },
                    // {
                    //     title: 'Example - updating your profile card picture',
                    //     value: `Use the command /update picture and your current Slack profile picture will be added to your profile card`
                    // }
                ]
            },
            {

                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                text: `*Example - updating your profile card picture*\nUse the command \`/update picture\` and your current Slack profile picture will be added to your profile card`

            },
            // {
            //     color: '#15df89',
            //     mrkdwn_in: ['text', 'pretext'],
            //     pretext: '*Help guides for other profile items*',
            //     text: 'Each of the commands below will call a help guide for the respective item',
            //     fields: [
            //         {
            //             title: `Updating Blog, Portfolio, or GitHub Profile Links`,
            //             value: `/update blog or /update portfolio or /update gitHub`,
            //         },
            //         {
            //             title: `Updating Certifications`,
            //             value: `/update certifications`,
            //         },
            //         {
            //             title: `Updating Projects`,
            //             value: `/update projects`,
            //         },
            //         {
            //             title: `Updating Skills`,
            //             value: `/update skills`,
            //         }
            //     ]
            // },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Help guides for other profile items*',
                text: `*Updating Blog, GitHub Profile, or Portfolio Links*\n\t\`/update blog\` or \`/update gitHub\` or \`/update portfolio\`\n\n*Updating Certifications*\n\t\`/update certifications\`\n\n*Updating Projects*\n\t\`/update projects\`\n\n*Updating Skills*\n\t\`/update skills\``,

            },
            {
                color: '#15df89',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Support*',
                text: `*if you need more help, have suggestions for improvement, or want to report a bug please add an issue on <https://www.github.com/the-vampiire/Chingu-Chimp/issues|GitHub>*`
            },
// ----------- REMOVE AFTER BETA -----------------
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/done update help\``
            }
// ----------- REMOVE AFTER BETA -----------------

        ]
    };

    const url = {

        response_type: 'ephemeral',
        text: '*Updating GitHub, Blog, or Portfolio URLs*',
        attachments: [
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*General form: \`/update <[blog] [gitHub] [portfolio]> -url yourURLhere\`*'

            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Profile Item(s)*',
                fields: [
                    {
                        title: 'blog',
                        value: 'your blog url'
                    },
                    {
                        title: 'gitHub',
                        value: 'your gitHub profile url',
                        short: true
                    },
                    {
                        title: 'Note',
                        value: 'must begin with "https://www.github.com/"',
                        short: true
                    },
                    {
                        title: 'portfolio',
                        value: 'your portfolio page url'
                    }
                ]
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Flag(s)*',
                fields: [
                    {
                        title: 'Flag',
                        value: '-url or -u',
                        short: true
                    },
                    {
                        title: 'Data',
                        value: 'full url beginning with http(s)://',
                        short: true
                    }
                ]
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                pretext: 'Example update of blog url:',
                text: `\`/update blog -url https://medium.com/@yourUserName\`\n \`/update gitHub -u https://github.com/yourUserName\``
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                pretext: 'Example *shorthand* update of blog url:',
                text: `\`/update blog -u https://medium.com/@yourUserName\``
            }
        ]

    };

    const projects = {

        response_type: 'ephemeral',
        text: '*Updating Projects*',
        attachments: [
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*General form: \`/update projects -name Project Name -git gitHubRepoLink [-url projectURL] [-date mm/dd/yy]\`*'

            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Profile Item(s)*',
                fields: [
                    {
                        title: 'projects',
                        value: 'a collection of your completed projects and their associated details'
                    }
                ]
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Flag(s)*',
                fields: [
                    {
                        title: 'Flag',
                        value: '-name or -n',
                        short: true,
                    },
                    {
                        title: 'Data',
                        value: 'the project name',
                        short: true
                    },
                    {
                        title: 'Flag',
                        value: '-git or -g',
                        short: true,
                    },
                    {
                        title: 'Data',
                        value: 'the GitHub repo link',
                        short: true
                    },
                    {
                        title: 'Flag [optional]',
                        value: '-url or -u',
                        short: true,
                    },
                    {
                        title: 'Data',
                        value: 'the project url link',
                        short: true
                    },
                    {
                        title: 'Flag [optional]',
                        value: '-date or -d',
                        short: true,
                    },
                    {
                        title: 'Data',
                        value: 'mm/dd/yy format',
                        short: true
                    },
                    {
                        value: 'if no date is passed today\'s is inserted automatically',
                    }
                ]
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                pretext: 'Example adding a project:',
                text: `\`/update projects -name New Project Name -git https://www.github.com/userName/newproject -url https://www.domain.com/newProject -d 08/08/17\``
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#666',
                pretext: 'Example *shorthand* adding a project [optional terms neglected]:',
                text: `\`/update projects -n New Project -g https://www.github.com/userName/newproject\``
            },
        ]

    };

    const certifications = {

        response_type: 'ephemeral',
        text: '*Updating Free Code Camp Certifications*',
        attachments: [
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*General form: \`/update certifications -url certificateURL [-date mm/dd/yy ]\`*'

            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Profile Item(s)*',
                fields: [
                    {
                        title: 'certifications',
                        value: 'the'
                    },
                    {
                        title: 'gitHub',
                        value: 'your gitHub profile url',
                        short: true
                    },
                    {
                        title: 'Note',
                        value: 'must begin with "https://www.github.com/"',
                        short: true
                    },
                    {
                        title: 'portfolio',
                        value: 'your portfolio page url'
                    }
                ]
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Flag(s)*',
                text: `[\`-url\`\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\``
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '_Example update of blog url:_',
                text: `\`/update blog -url https://medium.com/@yourUserName\`\n \`/update gitHub -u https://github.com/yourUserName\``
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '_Example *shorthand* update of blog url:_',
                text: `\`/update blog -u https://medium.com/@yourUserName\``
            }
        ]

    };





        `*General form: \`/update [profile item] [-flag data]\`*\n
        *Adding Free Code Camp Certifications*
        \t*Item(s)*
        \t\t[\`certifications\`]: your Free Code Camp certifications
        \t*Flag(s)*
        \t\t[\`-url\`\`certificate url\`] _example:_ \`-url https://www.freecodecamp.org/fccUserName/front-end-certification\`
        \t\t[\`-date\`\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *Optional*: If no date is passed - today's date is inserted.
        \t\t\t *Note:* Date must be mm/dd/yy format.
        
        \t_example adding a new certificate:_
        \t\t\`/update certifications -url https://www.freecodecamp.org/fccUserName/front-end-certification -date 08/08/17\`
        \t_example *shorthand* adding a new certificate:_
        \t\t\`/update certifications -u https://www.freecodecamp.org/fccUserName/front-end-certification -d 08/08/17\``;

    let response;
    switch(type){
        case 'help1':
            response = help1;
            break;
        case 'help2':
            response = help2;
            break;
        case 'help3':
            response = help3;
            break;
        case 'gitHub':
        case 'blog':
        case 'portfolio':
            response = url;
            break;
        case 'projects':
            response = projects;
            break;
        case 'skills':
            response = skills;
            break;
        case 'certifications':
            response = certifications;
            break;
        default:
// CHANGE AFTER BETA TESTING
            response = `invalid item [\`${type}\`]. Try \`/update help1\` or \`/update help2\` for a detailed help guide`
// CHANGE AFTER BETA TESTING
    }

    return response;
};

module.exports = {
    updateSkillsResponse,
    skillSelect,
    languageSelect,
    frameworkSelect,
    levelSelect,
    submitSkill,
    helpResponse
};
