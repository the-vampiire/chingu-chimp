/**
 * Created by Vampiire on 8/9/17.
 */

const userProfile = require('../database/profileModel').userProfile;


// ------------------- CORE EXPORTS ------------------- //

profileHelp = () => {
    return {
        response_type: 'ephemeral',
        text: '*The Profile Command*',
        attachments: [
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*General form: \`/profile <@userName> [share] [profile item]\`*',
                text: `*Calling \`/profile @userName\` will return that user's profile card.*\n\n*All profile requests are returned privately by default (only you can see it, designated by the gray "whisper" text)*\n\nIf the \`share\` argument is present *_after the username_* then the profile or profile item will be returned publicly to the current channel`
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Calling a specific profile item*',
                text: `\`/profile @userName story\` *will return the the requested user's intro story. this option defaults to private to prevent spamming*\n\n\`/profile @userName projects\` *will display the requested user's completed projects and associated details*\n\n\`/profile @userName certifications\` *will display the requested user's Free Code Camp certifications and certificate links*\n\n\`/profile @userName skills\` *will display the requested user's languages and frameworks and their associated skill levels*\n\n\`/profile @userName [url item]\` *will return the respective link item where* [\`url item\`] *can be any of the following:* [\`gitHub, portfolio, or blog\`]`
            },
            {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Examples*',
                text: `\`/profile @vampiire\` *will display Vampiire's profile card _privately_ to you*\n\n\`/profile @vampiire share\` *will display Vampiire's profile card _publicly_ to the channel*\n\n\`/profile @vampiire projects\` *will display Vampiire's projects _privately_ to you*\n\n\`/profile @vampiire share projects\` *will display Vampiire's projects _publicly_ to the channel*`
            },
// ----------- REMOVE AFTER BETA -----------------
            {
                color: '#FF0000',
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Next Step*',
                text: `type \`/done profile help\``
            }
// ----------- REMOVE AFTER BETA -----------------
        ]
    }
};

profileCard = (userName, share) => {

    return new Promise((resolve, reject) => {
        userProfile.getProfile(userName).then( user => {

            if(user){

                const profilePic = user.profilePic.size_192;
                const badges = user.badges;
                const points = user.points;
                const currentStreak = user.currentStreak.value;
                const bestStreak = user.bestStreak;
                const joinDate = `<!date^${Math.round((user.joinDate/1000))}^{date_pretty}|Failed to load date>`;
                const blog = user.blog;
                const gitHub = user.gitHub;
                const portfolio = user.portfolio;
                const projects = user.projects;
                const projectsLength = projects.length;
                const lastProject = user.projects[0];
                const skills = user.skills;
                const story = user.story;
                const certifications = user.certifications;
                const lastCheckin = user.lastCheckin;
                const totalCheckins = user.totalCheckins;

            // build up overview text based on available data
                let overViewText = `*Member Since:* ${joinDate}\n`;

                // format the check-in partners and check-in kind strings
                let lastCheckinPartners = ``;
                if(lastCheckin){
                    console.log(lastCheckin.partners);
                    lastCheckin.partners.forEach( (partner, index) => {
                        partner = `${partner.slice(0, 1).toUpperCase()}${partner.slice(1)}`;

                        if(lastCheckin.partners.length === 1) lastCheckinPartners += `${partner}`;
                        else if(index === lastCheckin.partners.length-1 && lastCheckinPartners){
                            if(lastCheckin.partners.length === 2) lastCheckinPartners = lastCheckinPartners.replace(/,/, '');
                            lastCheckinPartners += `and ${partner}`;
                        }
                        else lastCheckinPartners += `${partner}, `;
                    });

                    switch(lastCheckin.kind){
                        case 'Accountability':
                        case 'Pair Programming':
                            lastCheckin.kind = `${lastCheckin.kind} session`;
                            overViewText += `*Last Check-in:* ${lastCheckin.task} ${lastCheckin.kind} with ${lastCheckinPartners}\n`;
                            break;
                        case 'Team Meeting':
                            overViewText += `*Last Check-in:* ${lastCheckin.task} in a team meeting with ${lastCheckinPartners}\n`;
                            break;
                        case 'Self Check-in':
                            overViewText += `*Last Check-in:* ${lastCheckin.kind} working on ${lastCheckin.task.toLowerCase()}\n`;
                            break;

                    }


                }

                if(lastProject) overViewText += `*Last Completed Project:* <${lastProject.gitHub}|${lastProject.name}>\n`;
            // end overview text buildup

                let response = {

                    response_type: `${share ? `in_channel` : `ephemeral`}`,
                    text: `*CHINGU PROFILE CARD*\n*${userName.toUpperCase()}*`,

                    attachments: [

                        {
                            fallback: `${userName} join date, previous project, and last check-in`,
                            mrkdwn_in: ["text", "pretext"],
                            color: '#15df89',
                            text: overViewText,
                            thumb_url: profilePic,

                        },

                        {
                            fallback: `${userName} points, completed projects, best streak, current streak`,
                            mrkdwn_in: ['text', 'pretext'],
                            pretext: "*Dashboard*",
                            color: '#15df89',
                            fields: [
                                { title: 'Chingu Points', value: `${points}`, short: true },
                                { title: 'Total Check-ins',
                                    value: `${totalCheckins > 0 ? totalCheckins : "No check-in data available"}`,
                                    short: true
                                },
                                { title: 'Current Streak', value: `${currentStreak} days`, short: true },
                                { title: 'Best Streak', value: `${bestStreak} days`, short: true }
                            ]
                        },
                    ]
                };


                // add gitHub / blog / portfolio links if available
                if(gitHub || blog || portfolio) {
                    let socialMediaString = ``;
                    if(blog) socialMediaString += `*Blog:* ${blog}\n`;
                    if(gitHub) socialMediaString += `*GitHub* ${gitHub}\n`;
                    if(portfolio) socialMediaString += `*Portfolio*: ${portfolio}\n`;

                    response.attachments.push({
                        fallback: `${userName} social media links`,
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: '*Social Media*',
                        color: '#15df89',
                        text: `${socialMediaString}`
                    });
                }

            // add badges if available
                if(badges) response = attachBadges(badges, response, userName);

            // adds profile item buttons to the end of the profile card
            // buttons are colored based on the availability of the data - green for available / grey for missing
                // does not stop users from clicking but gives a visual indicator
                response.attachments.push({
                    mrkdwn_in: ['pretext', 'text'],
                    pretext: '*Additional Profile Items*',
                    color: '#15df89',
                    text: '*Play Nice:* No monkeying :monkey_face: around over the buttons!',
                    callback_id: 'profileItem',
                    actions: [
                        {
                            text: 'Story', name: 'story', type: 'button',
                            style: `${ story ? 'primary' : 'default'}`,
                            value: JSON.stringify({ item: 'story', userName: `${userName}` })
                        },

                        {
                            text: 'Skills', name: 'skills', type: 'button',
                            style: `${ (skills.languages.length || skills.frameworks.length) ? 'primary' : 'default'}`,
                            value: JSON.stringify({ item: 'skills', userName: `${userName}` })
                        },

                        {
                            text: 'Projects', name: 'projects', type: 'button',
                            style: `${ projectsLength ? 'primary' : 'default' }`,
                            value: JSON.stringify({ item: 'projects', userName: `${userName}` })
                        },

                        {
                            text: 'Certifications', name: 'certifications', type: 'button',
                            style: `${ certifications.length ? 'primary' : 'default'}`,
                            value: JSON.stringify({ item: 'certifications', userName: `${userName}` })
                        }
                    ]
                });

                resolve(response);
            }

            // no user found
            else resolve({
                response_type: 'in_channel',
                text: `User ${userName} does not have a Chingu profile. They can sign up <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>`
            });
        });
    })
};


profileItem = (userName, item, share) => {

    return new Promise((resolve, reject) => {
        userProfile.getProfileItem(userName, item).then( profileItem => {

            if(profileItem){
                profileItem = profileItem[item];
                userName = `${userName.slice(0,1).toUpperCase()}${userName.slice(1)}`;

                let response = { attachments: [] };
                switch(item){
                    case 'badges':
                        if(profileItem){
                            response = attachBadges(profileItem, response, userName);
                            response.attachments[0].pretext = `*${userName}'s Badges*`;
                        }
                        else response.text = `${userName} has not earned any badges yet :cry:`;
                        break;
                    case 'projects':
                        if(profileItem.length) response = projectsItemResponse(profileItem, response, userName);
                        else response.text = `${userName} has not added any completed projects :cry:`;
                        break;
                    case 'certifications':
                        if(profileItem.length) response = certificationsItemResponse(profileItem, response, userName);
                        else response.text = `${userName} has not added any Free Code Camp certifications :cry:`;
                        break;
                    case 'skills':
                        if(profileItem.languages.length || profileItem.frameworks.length)
                            response = skillsItemResponse(profileItem, response, userName);
                        else response = `${userName} has not added any skills :cry:`;
                        break;
                    case 'story':
                        share = false;
                    default:
                        if(profileItem){
                            response.attachments.push(simpleItemResponse(profileItem, item, userName));
                        }
                        else response = `${userName} has not added this information yet :cry:`
                }

            // attach a "return to profile" button to the bottom of individual responses
                response.attachments.push(profileCardButtonAttachment(userName));

            // settle the response type based on the share parameter boolean
                response.response_type = `${share ? 'in_channel' : 'ephemeral'}`;

                resolve(response);
            }
            else resolve({
                response_type: 'in_channel',
                text: `User ${userName} does not have a Chingu profile. They can sign up <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>`
            });

        });
    });
};

// ------------------ CUSTOM ATTACHMENTS ------------------ //

    simpleItemResponse = (profileItemString, item, userName) => {

        return {
            color: '#15df89',
            mrkdwn_in: ['text', 'pretext'],
            pretext: `*${userName}'s ${item}*`,
            text: profileItemString,
        };
    };

    certificationsItemResponse = (certifications, response, userName) => {

        certifications.forEach( (certificate, index) => {

            let attachment = {
                color: '#15df89',
                mrkdwn_in: ['pretext', 'text'],
                title: `${certificate.name}`,
                title_link: `${certificate.url}`
            };

            if(index === 0) attachment.pretext = userName ? `*${userName}'s Free Code Camp Certifications*` : `*Free Code Camp Certifications*`;

            response.attachments.push(attachment);
        });

        return response;
    };

    projectsItemResponse = (projects, response, userName) => {

        projects.forEach( (project, index) => {
            let attachment = {
                color: index % 2 ? '#666' : '#15df89',
                mrkdwn_in: ['pretext', 'text'],
                text: `*Project Name:* ${project.name}\n*GitHub Repo:* <${project.gitHub}|${project.gitHub.slice(project.gitHub.indexOf('.com/')+5)}>\n*Project Link:* ${ project.url ?  `<${project.url}|${project.name}>` : `No Link Available`}\n*Completed Date:* <!date^${Math.round((project.completedDate/1000))}^{date_pretty}|Failed to load date>`
            };

            if(index === 0) attachment.pretext = `*${userName}'s Completed Projects*`;

            response.attachments.push(attachment);
        });

        return response;
    };

    skillsItemResponse = (skills, response, userName) => {

        const languages = skills.languages;
        if(languages.length) {

            const languageAttachment = {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Languages*',
                fields: []
            };

            response.attachments.push(insertFields(languageAttachment, languages, 'Language', 'Skill Level'));
        }


        const frameworks = skills.frameworks;
        if(frameworks.length){
            const frameworkAttachment = {
                mrkdwn_in: ['text', 'pretext'],
                color: '#15df89',
                pretext: '*Frameworks*',
                fields: []
            };

            response.attachments.push(insertFields(frameworkAttachment, frameworks, 'Framework', 'Skill Level'));
        }

        if(userName) response.text = `*${userName}'s Languages and Frameworks*`;

        return response;

    };

// ------------ HELPERS -------------- //

    insertFields = (attachment, fieldsArray, title1, title2) => {
        fieldsArray.forEach( (field, index) => {

        // to not display "removed" skills
            if(field.level !== 'remove'){
                attachment.fields.push({
                    value: field.name,
                    short: true
                });

                attachment.fields.push({
                    value: field.level,
                    short: true
                });

                if(index === 0) {
                    attachment.fields[0].title = title1;
                    attachment.fields[1].title = title2;
                }
            }
        });

        return attachment;
    };


    // pass a new parameter that sets the badge color

    attachBadges = (badges, response, userName) => {
        const length = badges.length;

        if(length)
            badges.some( (badge, index) => {
                if(index > 2) return true;

                const attachment = {
                    color: '#15df89',
                    text: '',
                    mrkdwn_in: ['text', 'pretext'],
                    footer: badge.name,
                    footer_icon: badge.url
                };

                if(index === 0 ) {
                    attachment.pretext = length > 3 ?
                        `*Badges - press the button to view the remaining \`${length -3}\` badges*` :
                        '*Badges*';
                }

                response.attachments.push(attachment);
            });
        if(length > 3) response.attachments.push({
            color: '#666',
            mrkdwn_in: ['text'],
            text: '',
            callback_id: 'profileItem',
            actions: [{ text: 'Badges', name: 'badges', type: 'button',
                style: 'primary', value: JSON.stringify({ userName, item: 'badges' }) }]
        });

        return response;

    };


    profileCardButtonAttachment = userName => {
        return {
            color: '#666',
            text: '',
            callback_id: 'profileCard',
            actions: [
                {
                    text: `${userName}'s Profile`, name: 'profileCard', type: 'button',
                    style: 'primary',
                    value: JSON.stringify({ userName })
                }
            ]
        }
    };

module.exports = {
    profileHelp,
    profileItem,
    profileCard,
};
