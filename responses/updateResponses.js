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

    const help1 =
        `*How to use the \`/update\` command:* \n\nUpdating functions similarly to git in stringing together mandatory and/or optional \`[-flag data]\` pairs to build the update command\n
        *General form: \`/update [profile item] [-flag data]\`*\n
        *List of update items: \`blog\`, \`certifications\`, \`gitHub\`, \`picture\`, \`portfolio\`, \`projects\`, \`skills\`, \`story\`*\n
        *List of update flags: \`-date\` or \`-d\`, \`-git\` or \`-g\`, \`-name\` or \`-d\`, \`-url\` or \`-u\`*\n
        
        *Updating GitHub, Blog, or Portfolio URLs*
        \t*Item(s)*
        \t\t[\`gitHub\`]: your gitHub profile url
        \t\t[\`blog\`]: your blog url
        \t\t[\`portfolio\`]: your portfolio url
        \t*Flag(s)*
        \t\t[\`-url\`\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\`
        
        \t_example update of blog url:_ \`/update blog -url https://medium.com/@yourUserName\`
        \t_example *shorthand* update of blog url:_ \`/update blog -u https://medium.com/@yourUserName\`
        \n
        *Updating User Story*
        \t*Item(s)*
        \t\t[\`story\`]: your user story (that you entered in the Intro channel)
        \t*Flag(s)*
        \t\tNone. 
        \t\t*Note:* You can preserve the formatting [markdown] by copying directly from the edit message window in your intro post
        
        \t_example update of user story:_ \`/update story Hello you can call me Vamp I am a...\`
        \n
        *Adding Projects*
        \t*Item(s)*
        \t\t[\`projects\`]
        \t*Flag(s)*
        \t\t[\`-name\`\`project name\`] _example:_ \`-name Project Name\`
        \t\t[\`-url\`\`project homepage\`] _example:_ \`-url https://www.domain.com/projectName\`
        \t\t\t *Optional*: including a project url is recommended but not required
        \t\t[\`-git\`\`project GitHub repo\`] _example:_ \`-git https://www.github.com/yourUserName/projectName\`
        \t\t\t*Note*: a gitHub repo link is required for every project
        \t\t[\`-date\`\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *Optional*: If no date is passed - today's date is inserted. 
        \t\t\t *Note:* Date must be mm/dd/yy format.
        
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
        \tAn interactive form will be sent back to you to add or update a language or framework skill.
        \t\t*Note*: to update an existing skill level select the language or framework then select the new skill level.
        \n
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
        \t\t\`/update certifications -u https://www.freecodecamp.org/fccUserName/front-end-certification -d 08/08/17\`
        
        *Updating Your Profile Picture*
        \t*Item(s)*
        \t\t[\`picture\`]: the profile picture that is displayed on your profile card
        \t*Flag(s)*
        \t\tNone.
        \tUse the command \`/update picture\` and your current Slack profile picture will be added to your profile card.
        
        *if you need more help, have suggestions for improvement, or want to report a bug please add an issue on <https://www.github.com/the-vampiire/Chingu-Chimp/issues|GitHub>*`;

    const help2 = `*How to use the \`/update\` command:* \n\nUpdating functions similarly to git in stringing together mandatory and/or optional \`[-flag data]\` pairs to build the update command\n
        *General form: \`/update [profile item] [-flag data]\`*\n
        *List of update items: \`blog\`, \`certifications\`, \`gitHub\`, \`picture\`, \`portfolio\`, \`projects\`, \`skills\`, \`story\`*\n
        *List of update flags: \`-date\` or \`-d\`, \`-git\` or \`-g\`, \`-name\` or \`-d\`, \`-url\` or \`-u\`*\n\n
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
        
        *if you need more help, have suggestions for improvement, or want to report a bug please add an issue on <https://www.github.com/the-vampiire/Chingu-Chimp/issues|GitHub>*`;

    const url = `*General form: \`/update [profile item] [-flag data]\`*\n
        *Updating GitHub, Blog, or Portfolio URLs*
        \t*Item(s)*
        \t\t[\`gitHub\`]: your gitHub profile url
        \t\t[\`blog\`]: your blog url
        \t\t[\`portfolio\`]: your portfolio url
        \t*Flag(s)*
        \t\t[\`-url\`\`full url\`] _example:_ \`-url https://www.github.com/yourUserName\`
        
        \t_example update of blog url:_ \`/update blog -url https://medium.com/@yourUserName\`
        \t_example *shorthand* update of blog url:_ \`/update blog -u https://medium.com/@yourUserName\`
        \n`;

    const projects = `*General form: \`/update [profile item] [-flag data]\`*\n
        *Adding Projects*
        \t*Item(s)*
        \t\t[\`projects\`]
        \t*Flag(s)*
        \t\t[\`-name\`\`project name\`] _example:_ \`-name Project Name\`
        \t\t[\`-url\`\`project homepage\`] _example:_ \`-url https://www.domain.com/projectName\`
        \t\t\t *Optional*: including a project url is recommended but not required
        \t\t[\`-git\`\`project GitHub repo\`] _example:_ \`-git https://www.github.com/yourUserName/projectName\`
        \t\t\t*Note*: a gitHub repo link is required for every project
        \t\t[\`-date\`\`date of completion\`] _example:_ \`-date 01/01/17\`
        \t\t\t *Optional*: If no date is passed - today's date is inserted. 
        \t\t\t *Note:* Date must be mm/dd/yy format.
        
        \t_example adding a project:_
        \t\t\`/update projects -name New Project -url https://www.domain.com/newProject\` 
        \t\t\`-git https://www.github.com/yourUserName/newProject -date 08/08/17\`
        \t_example *shorthand* adding a project:_
        \t\t\`/update projects -n New Project -u https://www.domain.com/newProject\` 
        \t\t\`-g https://www.github.com/yourUserName/newProject -d 08/08/17\`
        \n`;

    const skills = `*General form: \`/update [profile item] [-flag data]\`*\n
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

    const certifications = `*General form: \`/update [profile item] [-flag data]\`*\n
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
            response = `invalid item [\`${type}\`]. Try \`/update help1\` or \`/update help2\` for a detailed help guide`
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
