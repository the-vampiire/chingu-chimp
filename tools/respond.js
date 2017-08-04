/**
 * Created by Vampiire on 7/24/17.
 */

const val = require('./valueStringer');

// generic submit
    submit = (responseObject, valueObject, formatObject) => {
        let response = responseObject;
    };

// ------------ CHECKIN RESPONSES ------------------ //

    checkinResponse = () => {
        return {
            title: "Check In",
            pretext: "Use the following dropdown menus to define and check into your activity.",
        };
    };

    activitySelect = valueObject => {

        // console.log(`activity select \n ${JSON.stringify(valueObject)}`);

        const menuItems = ['accountability', 'pair programming', 'team meeting'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select an activity', 'activitySelect', 'kind', valueObject, menuItems)];

        return response;

    };

    // userSelect = valueObject => {
    //
    //     const menuItems = ['vampiire', 'dsglovia', 'jessec'];
    //
    //     let response = checkinResponse();
    //     response.attachments = [val.menu('Select a partner', 'userSelect', 'partners', valueObject, menuItems)];
    //
    //     return response;
    // };

    taskSelect = valueObject => {

        // console.log(`task select \n ${valueObject}`);

        const menuItems = ['code wars', 'tutorial', 'other'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select a task', 'taskSelect', 'task', valueObject, menuItems)];

        return response;
    };

    submitCheckin = (payload, valueObject) => {

        // console.log(`submit checkin \n ${valueObject}`);

        valueObject = JSON.parse(valueObject);
        let response = checkinResponse();
        response.attachments = [val.button(`Check-in confirmation: ${valueObject.kind} session with ${valueObject.partners.join(', ')} to work on ${valueObject.task}`,
                                'checkInSubmit', 'Check In', 'submit', true, valueObject)];
        return response;

    };
// ------------ UPDATE RESPONSES ------------------ //

updateResponse = () => {
    return ``
};

helpResponse = (type) => {

    let help =
    `*How to use the \`/update\` command:* \n\nUpdating works like git in stringing together mandatory and/or optional [-flag] [data] pairs to build your update command\nGeneral form: \`/update [profile item to update] [[-flag] [data]]\`
    \n*Available profile items and associated flags*:
    *Updating GitHub, Blog, or Portfolio URLs*
    \t*Item(s)*
    \t\t[\`git\`]: your github profile url
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
    *Adding or Updating Aptitudes*
    \t*Item(s)*
    \t\t[\`aptitudes\`]: your languages and frameworks and their associated skill levels
    \t*Flag(s)*
    \t\tNone. An interactive message will be sent back where you can choose to update a language or framework. 
    \t\tPer this choice a dropdown menu of the languages or frameworks will be supplied. 
    \t\tAfter one is chosen from the list a skill level dropdown will be provided for selection.
    \t\tOn submit the new language or framework and its skill level will be added to the aptitudes section of your profile
    \t\t\tNote: to update an existing skill level select the language or framework then select the new skill level.
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

    let url = `General form: \`/update [profile item] [[-flag] [data]]\`\n
    *Updating GitHub, Blog, or Portfolio URLs*
    \t*Item(s)*
    \t\t[\`git\`]: your github profile url
    \t\t[\`blog\`]: your blog url
    \t\t[\`portfolio\`]: your portfolio url
    \t*Flag(s)*
    \t\t[\`-url\`] [\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\`
    \t_example update of blog url:_ \`/update blog -url https://medium.com/@yourUserName\`
    \t_example *shorthand* update of blog url:_ \`/update blog -u https://medium.com/@yourUserName\`
    \n`;

    let story = `General form: \`/update [profile item] [[-flag] [data]]\`\n
    *Updating User Story*
    \t*Item(s)*
    \t\t[\`story\`]: your user story (that you entered in the Intro channel)
    \t*Flag(s)*
    \t\tNone. You can paste your story and preserve the markdown by copying from the edit message window in your Intro post
    \t_example update of user story:_ \`/update story ...your pasted story here...\`
    \n`;

    let projects = `General form: \`/update [profile item] [[-flag] [data]]\`\n
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

    let aptitudes = `General form: \`/update [profile item] [[-flag] [data]]\`\n
    *Adding or Updating Aptitudes*
    \t*Item(s)*
    \t\t[\`aptitudes\`]: your languages and frameworks and their associated skill levels
    \t*Flag(s)*
    \t\tNone. An interactive message will be sent back where you can choose to update a language or framework. 
    \t\tPer this choice a dropdown menu of the languages or frameworks will be supplied. 
    \t\tAfter one is chosen from the list a skill level dropdown will be provided for selection.
    \t\tOn submit the new language or framework and its skill level will be added to the aptitudes section of your profile
    \t\t\tNote: to update an existing skill level select the language or framework then select the new skill level.
    \n`;

    let certifications = `General form: \`/update [profile item] [[-flag] [data]]\`\n
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

    console.log(`helper type ${type}`);
    let response;
    switch(type){
        case 'help':
            response = help;
            break;
        case 'git':
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
        case 'aptitudes':
            response = aptitudes;
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
    submit : submit,
    activitySelect : activitySelect,
    // userSelect : userSelect,
    taskSelect : taskSelect,
    submitCheckin : submitCheckin,

    helpResponse : helpResponse
};
