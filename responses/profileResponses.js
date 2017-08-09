/**
 * Created by Vampiire on 8/9/17.
 */

const userProfile = require('../database/profileModel').userProfile;


// ------------------- CORE EXPORTS ------------------- //

profileHelp = () => {
    return `
    *General form: \`/profile [share] [profile item]\`*
    if the \`share\` argument is present *_after the username_* then the profile or profile item will be returned publicly to the current channel\n\n
    *Calling a specific profile item*
    \`/profile @userName story\` will return the the requested user's intro story. this option defaults to private to prevent spamming\n
    \`/profile @userName projects\` will display the requested user's completed projects and associated details\n
    \`/profile @userName certifications\` will display the requested user's Free Code Camp certifications and certificate links\n
    \`/profile @userName skills\` will display the requested user's languages and frameworks and their associated skill levels\n
    \`/profile @userName [url item]\` where [\`url item\`] includes [\`gitHub, portfolio, or blog\`] will return the respective link for the requested user
    \n
    *Examples*
    \`/profile @vampiire\` will display Vampiire's profile card privately to you\n
    \`/profile @vampiire share\` will display Vampiire's profile card publicly to the channel\n
    \`/profile @vampiire projects\` will display Vampiire's projects privately to you\n
    \`/profile @vampiire share projects\` will display Vampiire's projects publicly to the channel\n
    *if you need more help, have suggestions for improvement, or want to report a bug contact @vampiire*`
};

profileItem = (userName, item, share) => {

    return new Promise((resolve, reject) => {
        userProfile.getProfileItem(userName, item).then( profileItem => {

            if(profileItem){
                userName = `${userName.slice(0,1).toUpperCase()}${userName.slice(1)}`;
                // this is a stupid fix. need to strip the mongodb fluff
                profileItem = profileItem[item];

                let response = { attachments: [] };
                response.response_type = share ? 'in_channel' : 'ephemeral';
                switch(item){
                    case 'projects':
                        if(profileItem) response = projectsItemResponse(profileItem, response, userName);
                        else response.text = `${userName} does not currently have any projects`;
                        break;
                    case 'certifications':
                        if(profileItem.length) response = certificationsItemResponse(profileItem, response, userName);
                        else response.text = `${userName} does not currently have any Free Code Camp certifications`;
                        break;
                    case 'skills':
                        if(profileItem.languages.length || profileItem.frameworks.length)
                            response = skillsItemResponse(profileItem, response, userName);
                        else response = `${userName} has not added any skills`;
                        break;
                    case 'story':
                        share = false;
                    default:
                        response = simpleItemResponse(profileItem, share);
                }

                resolve(response);
            }
            else resolve({
                response_type: 'in_channel',
                text: `User ${userName} does not have a Chingu profile. Message them and suggest they add one! RETURN FORM URL LINK HERE`
        });

        });
    });
};

profileCard = (userName, share) => {

    return userProfile.getProfile(userName).then( user => {

        if(user){
            const profilePic = user.profilePic.size_192;
            const points = user.points;
            const currentStreak = user.currentStreak.value;
            const bestStreak = user.bestStreak;
            const joinDate = `<!date^${Math.round((user.joinDate/1000))}^{date_pretty}|Failed to load date>`;
            const blog = user.blog;
            const gitHub = user.gitHub;
            const portfolio = user.portfolio;
            const lastProject = user.projects.pop();
            const certifications = user.certifications;
            const lastCheckin = user.lastCheckin;
            const totalCheckins = user.totalCheckins;

            // format the check-in partners and check-in kind strings
            let lastCheckinPartners = ``;
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
                case 'Pair programming':
                    lastCheckin.kind = `${lastCheckin.kind} session`;
                    break;
            }
            // end formatting

            const response = {

                response_type: `${share ? `in_channel` : `ephemeral`}`,
                text: `*${userName.toUpperCase()}'s PROFILE*`,

                attachments: [

                    {
                        fallback: `${userName} join date, previous project, and last check-in`,
                        mrkdwn_in: ["text", "pretext"],
                        color: '#15df89',
                        text: `*Member Since:* ${joinDate}\n*Last Completed Project:* <${lastProject.url}|${lastProject.name}>
*Last Check-in:* ${lastCheckin.kind} with ${lastCheckinPartners}`,
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
                            { title: 'Current Streak', value: `${currentStreak}`, short: true },
                            { title: 'Best Streak', value: `${bestStreak}`, short: true }
                        ]
                    }
                ]
            };

            if(gitHub || blog || portfolio) response.attachments.push({
                fallback: `${userName} social media links`,
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Social Media*',
                color: '#666666',
                text: `*GitHub:* ${gitHub ? `${gitHub}\n`: `No GitHub profile available\n`}*Portfolio:* ${portfolio ? `${portfolio}\n` : `No portfolio link available\n`}*Blog:* ${blog ? `${blog}` : `No blog link available\n`}`
            });

            if(certifications.length) certificationsItemResponse(certifications, response);


            return response;
        }
        else return {
            response_type: 'in_channel',
            text: `User ${userName} does not have a Chingu profile. Message them and suggest they add one! RETURN FORM URL LINK HERE`
        }


    });
};

// ------------------ CUSTOM ATTACHMENTS ------------------ //

    simpleItemResponse = (profileItemString, share) => {
        return {
            response_type: `${share ? 'in_channel' : 'ephemeral'}`,
            text: profileItemString
        }
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
                color: index % 2 ? '#666666' : '#15df89',
                mrkdwn_in: ['pretext', 'text'],
                text: `*Project Name:* ${project.name}\n*GitHub Repo:* <${project.gitHub}|${project.gitHub.slice(project.gitHub.indexOf('.com/')+5)}>\n*Project Link:* ${ project.url ?  `<${project.url}|${project.name}>` : `No Link Available`}\n*Completed Date:* <!date^${Math.round((project.completedDate/1000))}^{date_pretty}|Failed to load date>`
            };

            if(index === 0) attachment.pretext = `*${userName}'s Completed Projects*`;

            response.attachments.push(attachment);
        });

        return response;
    };

    skillsItemResponse = (skills, response, userName) => {

        response.text = `*${userName}'s Languages and Frameworks*`;

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
                color: '#666666',
                pretext: '*Frameworks*',
                fields: []
            };

            response.attachments.push(insertFields(frameworkAttachment, frameworks, 'Framework', 'Skill Level'));
        }

        return response;

    };

// ------------ HELPERS -------------- //

    insertFields = (attachment, fieldsArray, title1, title2) => {
        fieldsArray.forEach( (field, index) => {

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
        });

        return attachment;
    };

module.exports = {
    profileHelp,
    profileItem,
    profileCard,
};
