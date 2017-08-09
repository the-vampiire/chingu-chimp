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
        \t\t\t*Github Link required but you may also include a frontend url optional*
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
        \t\t\t*Github Link required but you may also include a frontend url optional*
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
    updateSkillsResponse,
    skillSelect,
    languageSelect,
    frameworkSelect,
    levelSelect,
    submitSkill,
    helpResponse
};