/**
 * Created by Vampiire on 7/24/17.
 */

// pull in the valStringer tool
const val = require('./valStringer');

// generic submit
    submit = (responseObject, valueObject, formatObject) => {
        let response = responseObject;
    };

// ------------ CHECKIN RESPONSES ------------------ //

    checkinResponse = () => {
        return {
            response_type: 'in_channel',
            text: "Check In \nUse the following interactive message sequence to define and check into your activity."
        };
    };

    activitySelect = valueObject => {

        // console.log(`activity select \n ${JSON.stringify(valueObject)}`);

        const menuItems = ['accountability', 'pair programming', 'team meeting'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select an activity', 'activitySelect', 'kind', valueObject, menuItems)];

        return response;

    };

    taskSelect = valueObject => {

        // console.log(`task select \n ${valueObject}`);

        const menuItems = ['code wars', 'tutorial', 'other'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select a task', 'taskSelect', 'task', valueObject, menuItems)];

        return response;
    };

    submitCheckin = valueObject => {
        valueObject = JSON.parse(valueObject);
        const partners = valueObject.partners;

        let kind = `${valueObject.kind.slice(0,1).toUpperCase()}${valueObject.kind.slice(1)}`;
        switch(kind){
            case 'Accountability':
            case 'Pair programming':
                console.log('called');
                kind = `${kind} session`;
                break;
        }

        let partnerString = ``;
        partners.forEach( (partner, index) => {
            if(partners.length === 1) partnerString += `@${partner}`;
            else if(index === partners.length-1) partnerString += `and @${partner}`;
            else partnerString += `@${partner} `;
        });

        return valSubmit(valueObject, 'checkin', true,
            `Check-in to *${kind}* to work on *${valueObject.task}*\nCheck-in will be processed for: *${partnerString}*`);
    };

// ------------ PROFILE RESPONSES ------------------ //
const userProfile = require('../database/profileModel').userProfile;

    profileItem = (userName, share, item) => {

    };

    profileCard = (userName, share) => {

        return userProfile.getProfile(userName).then( user => {

            const profilePic = user.profilePic.size_192;
            const points = user.points;
            const currentStreak = user.currentStreak.value;
            const bestStreak = user.bestStreak;
            const joinDate = `<!date^${Math.round((user.joinDate/1000))}^{date_pretty}|Failed to load date>`;
            const blog = user.blog;
            const gitHub = user.gitHub;
            const portfolio = user.portfolio;
            const projectsLength = user.projects.length;
            const lastProject = user.projects.pop();
            const certifications = user.certifications;

            const lastCheckin = user.lastCheckin;
            let lastCheckinPartners = ``;
            lastCheckin.partners.forEach( (partner, index) => {
                if(index === lastCheckin.partners.length-1 && lastCheckinPartners) lastCheckinPartners += `and ${partner}`;
                else lastCheckinPartners += `${partner}, `;
            });

            const response = {

                response_type: `${share ? `in_channel` : `ephemeral`}`,
                text: `*${userName.toUpperCase()}'s PROFILE*`,

                attachments: [

                    {
                        fallback: `${userName} join date, previous project, and last check-in`,
                        mrkdwn_in: ["text", "pretext"],
                        color: '#15df89',
                        text: `*Member Since:* ${joinDate}\n*Previous Project:*`
                        +"<"+`${lastProject.url}|${lastProject.name}`+">"+
                        `\n*Last Check-in:* ${lastCheckin.kind} with ${lastCheckinPartners}`,
                        thumb_url: profilePic,

                    },

                    {
                        fallback: `${userName} points, completed projects, best streak, current streak`,
                        mrkdwn_in: ['text', 'pretext'],
                        pretext: "*Dashboard*",
                        color: '#15df89',
                        fields: [
                            {
                                title: 'Chingu Points',
                                value: `${points}`,
                                short: true
                            },
                            {
                                title: 'Completed Projects',
                                value: `${projectsLength > 0 ? projectsLength : "No project data available"}`,
                                short: true
                            },
                            {
                                title: 'Current Streak',
                                value: `${currentStreak}`,
                                short: true
                            },
                            {
                                title: 'Best Streak',
                                value: `${bestStreak}`,
                                short: true
                            }
                        ]
                    }
                ]
            };

            if(gitHub || blog || portfolio) response.attachments.push({
                fallback: `${userName} social media links`,
                mrkdwn_in: ['text', 'pretext'],
                pretext: '*Social Media*',
                color: '#000000',
                text: `*GitHub:* ${gitHub ? `${gitHub}\n`: `No GitHub profile available\n`}*Portfolio:* ${portfolio ? `${portfolio}\n` : `No portfolio link available\n`}*Blog:* ${blog ? `${blog}` : `No blog link available\n`}`
            });

            if(certifications.length) {

                certifications.shift();

                certifications.forEach( (certificate, index) => {

                    console.log(certificate);

                    let attachment = {
                        color: '#15df89',
                        mrkdwn_in: ['pretext', 'text'],
                        title: `${certificate.name}`,
                        title_link: `${certificate.url}`
                    };

                    if(index === 0){
                        attachment.pretext = '*Free Code Camp Certifications*'
                    }

                    response.attachments.push(attachment);
                });
            }

            return response;

        });
    };



    getAttachmentItem = (userName, item) => {

        switch(item){
            case 'dashboard':
                return dashboard(userName);
            case 'points':
                return points(userName);
                break;
            default:
                console.log('invalid profile item requested');
        }

    };

// ------------ UPDATE RESPONSES ------------------ //

    updateSkillsResponse = () => {
        let response = {
            text: 'Add or update your skills \nAdd a new skill or select an existing one and submit an updated skill level'
        };

        return response;
    };

    skillSelect = valueObject => {
        let response = updateSkillsResponse();
        response.attachments = [val.menu('Select a skill to add or update', 'skillSelect', 'skill', valueObject, ['languages', 'frameworks'])];
        return response;
    };

    languageSelect = valueObject => {
        // csv repo https://github.com/jamhall/programming-languages-csv/blob/master/languages.csv
            // set the languages array to the database array of languages used in the dropdown menus of the profile form

        const languages = ['JavaScript', 'Java', 'Python', 'Ruby', 'C++', 'C#.Net', 'Assembly', 'Bash', 'Basic', 'C', 'C#',
            'Fortran', 'Go', 'MATLAB', 'Objective-C', 'Perl', 'PHP', 'Powershell', 'VBA'];

        let response = updateSkillsResponse();
        response.attachments = [val.menu('Select a language', 'languageSelect', 'name', valueObject, languages)];
        return response;
    };

    frameworkSelect = valueObject => {
        // set the frameworks array to the database array of frameworks used in the dropdown menus of the profile form

        const frameworks = ['jQuery', 'Bootstrap', 'Angular2/4', 'AngularJS', 'Electron', 'jQueryUI', 'React', 'React Native', 'Vue'];

        let response = updateSkillsResponse();
        response.attachments = [val.menu('Select a framework', 'frameworkSelect', 'name', valueObject, frameworks)];
        return response;
    };

    levelSelect = valueObject => {
        const levels = ['novice', 'intermediate', 'expert', 'wizard'];
        let response = updateSkillsResponse();
        response.attachments = [val.menu('Select your skill level', 'levelSelect', 'level', valueObject, levels)];
        return response;
    };

    submitSkill = valueObject => {
        valueObject = JSON.parse(valueObject);
        // let response = updateSkillsResponse();

    // IMPORTANT -----  these need to be passed custom attachments. proof of concept works but they look ugly as shit
// DO EVERYTHING BELOW THIS LINE. MAKE IT HAPPEN
        // valStringer note: add a "submit / restart" valStringer method as an option alongise valMenu and valButton
            // implement a dropdown that lets you select which part of the menu you would like to edit
            // add a final method that accepts and parses the valueObject
        // response.attachments = [val.button(`You have selected ${valueObject.name} at the ${valueObject.level} skill level`,
        //     'skillSubmit', 'Submit', 'submit', true, valueObject)];

        return valSubmit(valueObject, 'skill', true, `You have selected *${valueObject.name}* at the *${valueObject.level}* skill level`);
    };

    helpResponse = (type) => {

        let help =
        `*How to use the \`/update\` command:* \n\nUpdating works like git in stringing together mandatory and/or optional \`[-flag] [data]\` pairs to build your update command\n
        *General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *List of update items: \`skills\`, \`blog\`, \`certifications\`, \`gitHub\`, \`portfolio\`, \`projects\`, \`story\`*\n
        *List of update flags: \`-date\` or \`-d\`, \`-git\` or \`-g\`, \`-name\` or \`-d\`, \`-url\` or \`-u\`*\n
        
        *Updating GitHub, Blog, or Portfolio URLs*
        \t*Item(s)*
        \t\t[\`gitHub\`]: your github profile url
        \t\t[\`blog\`]: your blog url
        \t\t[\`portfolio\`]: your portfolio url
        \t*Flag(s)*
        \t\t[\`-url\`] [\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\`
        
        \t_example update of blog url:_ \`/update blog -url https://medium.com/@yourUserName\`
        \t_example *shorthand* update of blog url:_ \`/update blog -u https://medium.com/@yourUserName\`
        \n
        *Updating User Story*
        \t*Item(s)*
        \t\t[\`story\`]: your user story (that you entered in the Intro channel)
        \t*Flag(s)*
        \t\tNone. You can paste your story and preserve the markdown by copying from the edit message window in your Intro post
        
        \t_example update of user story:_ \`/update story ...your pasted story here...\`
        \n
        *Adding Projects*
        \t*Item(s)*
        \t\t[\`projects\`]
        \t*Flag(s)*
        \t\t[\`-name\`] [\`project name\`] _example:_ \`-name Project Name\`
        \t\t[\`-url\`] [\`project front end url\`] _example:_ \`-url https://www.domain.com/projectName\`
        \t\t[\`-git\`] [\`project GitHub repo\`] _example:_ \`-git https://www.github.com/yourUserName/projectName\`
        \t\t\t*Either git, url, or both must be supplied*
        \t\t[\`-date\`] [\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *OPTIONAL: If no date is passed - today's date is inserted. Date must be mm/dd/yy format.*
        
        \t_example adding a project:_
        \t\t\`/update projects -name New Project -url https://www.domain.com/newProject\` 
        \t\t\`-git https://www.github.com/yourUserName/newProject -date 08/08/17\`
        \t_example *shorthand* adding a project:_
        \t\t\`/update projects -n New Project -u https://www.domain.com/newProject\` 
        \t\t\`-g https://www.github.com/yourUserName/newProject -d 08/08/17\`
        \n
        *Adding or Updating Skills*
        \t*Item(s)*
        \t\t[\`skills\`]: your languages and frameworks and their associated skill levels
        \t*Flag(s)*
        \t\tNone. 
        
        \tAn interactive message will be sent back where you can choose to update a language or framework. 
        \tAfter making your choice a dropdown menu of the languages or frameworks will be supplied. 
        \tAfter one is chosen from the list a skill level dropdown will be provided for selection.
        \tOn submit the new language or framework and its skill level will be added to the skills section of your profile
        \t\t*Note*: to update an existing skill level select the language or framework then select the new skill level.
        \n
        *Adding Free Code Camp Certifications*
        \t*Item(s)*
        \t\t[\`certifications\`]: your Free Code Camp certifications
        \t*Flag(s)*
        \t\t[\`-url\`] [\`certificate url\`] _example:_ \`-url https://www.freecodecamp.org/fccUserName/front-end-certification\`
        \t\t[\`-date\`] [\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *OPTIONAL: If no date is passed - today's date is inserted. Date must be mm/dd/yy format.*
        
        \t_example adding a new certificate:_
        \t\t\`/update certifications -url https://www.freecodecamp.org/fccUserName/front-end-certification -date 08/08/17\`
        \t_example *shorthand* adding a new certificate:_
        \t\t\`/update certifications -u https://www.freecodecamp.org/fccUserName/front-end-certification -d 08/08/17\`
        
        If you need more help or have constructive criticism to share please contact @vampiire`;

        let url = `*General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *Updating GitHub, Blog, or Portfolio URLs*
        \t*Item(s)*
        \t\t[\`gitHub\`]: your github profile url
        \t\t[\`blog\`]: your blog url
        \t\t[\`portfolio\`]: your portfolio url
        \t*Flag(s)*
        \t\t[\`-url\`] [\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\`
        
        \t_example update of blog url:_ \`/update blog -url https://medium.com/@yourUserName\`
        \t_example *shorthand* update of blog url:_ \`/update blog -u https://medium.com/@yourUserName\`
        \n`;

        let story = `*General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *Updating User Story*
        \t*Item(s)*
        \t\t[\`story\`]: your user story (that you entered in the Intro channel)
        \t*Flag(s)*
        \t\tNone. You can paste your story and preserve the markdown by copying from the edit message window in your Intro post
        
        \t_example update of user story:_ \`/update story ...your pasted story here...\`
        \n`;

        let projects = `*General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *Adding Projects*
        \t*Item(s)*
        \t\t[\`projects\`]
        \t*Flag(s)*
        \t\t[\`-name\`] [\`project name\`] _example:_ \`-name Project Name\`
        \t\t[\`-url\`] [\`project front end url\`] _example:_ \`-url https://www.domain.com/projectName\`
        \t\t[\`-git\`] [\`project GitHub repo\`] _example:_ \`-git https://www.github.com/yourUserName/projectName\`
        \t\t\t*Either git, url, or both must be supplied*
        \t\t[\`-date\`] [\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *OPTIONAL: If no date is passed - today's date is inserted. Date must be mm/dd/yy format.*
        
        \t_example adding a project:_
        \t\t\`/update projects -name New Project -url https://www.domain.com/newProject\` 
        \t\t\`-git https://www.github.com/yourUserName/newProject -date 08/08/17\`
        \t_example *shorthand* adding a project:_
        \t\t\`/update projects -n New Project -u https://www.domain.com/newProject\` 
        \t\t\`-g https://www.github.com/yourUserName/newProject -d 08/08/17\`
        \n`;

        let skills = `*General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *Adding or Updating Skills*
        \t*Item(s)*
        \t\t[\`skills\`]: your languages and frameworks and their associated skill levels
        \t*Flag(s)*
        \t\tNone. 
        
        \tAn interactive message will be sent back where you can choose to update a language or framework. 
        \tAfter making your choice a dropdown menu of the languages or frameworks will be supplied. 
        \tAfter one is chosen from the list a skill level dropdown will be provided for selection.
        \tOn submit the new language or framework and its skill level will be added to the skills section of your profile
        \t\t*Note*: to update an existing skill level select the language or framework then select the new skill level.
        \n`;

        let certifications = `*General form: \`/update [profile item] [[-flag] [data]]\`*\n
        *Adding Free Code Camp Certifications*
        \t*Item(s)*
        \t\t[\`certifications\`]: your Free Code Camp certifications
        \t*Flag(s)*
        \t\t[\`-url\`] [\`certificate url\`] _example:_ \`-url https://www.freecodecamp.org/fccUserName/front-end-certification\`
        \t\t[\`-date\`] [\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *OPTIONAL: If no date is passed - today's date is inserted. Date must be mm/dd/yy format.*
        
        \t_example adding a new certificate:_
        \t\t\`/update certifications -url https://www.freecodecamp.org/fccUserName/front-end-certification -date 08/08/17\`
        \t_example *shorthand* adding a new certificate:_
        \t\t\`/update certifications -u https://www.freecodecamp.org/fccUserName/front-end-certification -d 08/08/17\``;

        let response;
        switch(type){
            case 'help':
                response = help;
                break;
            case 'gitHub':
            case 'blog':
            case 'portfolio':
                response = url;
                break;
            case 'story':
                response = story;
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
                response = `invalid item [${type}]. Try \`/update help\` for a detailed help guide`
        }

        return response;
    };


module.exports = {
// CHECKIN
    submit : submit,
    activitySelect : activitySelect,
    // userSelect : userSelect,
    taskSelect : taskSelect,
    submitCheckin : submitCheckin,

// PROFILE
    profileCard,

// UPDATE
    helpResponse : helpResponse,
    skillSelect : skillSelect,
    languageSelect : languageSelect,
    frameworkSelect : frameworkSelect,
    levelSelect,
    submitSkill : submitSkill
};
