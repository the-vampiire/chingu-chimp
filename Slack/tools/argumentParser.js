/**
 * Created by Vampiire on 8/3/17.
 *
 *
 */

/*
*
* consider changing the format for updating. where /update is called and a message with multiple button attachments
* is sent back. each attachment represents an updatable item. when the user clicks it pass that in as the item
* or send back the appropriate message(s) such as the case of aptitudes.
*
* one less step for people to deal with
*
* will need to change the argumentSplitter to handle this
*
*
*
* // BETA SUGGESTIONS //
*
* work on replacing -g / -git with -r / -repo for clarity
*
*
* */

argumentParser = arguments => {

    const acceptedUpdateItems = ['gitHub', 'blog', 'picture', 'portfolio', 'story', 'projects', 'certifications'];
    let error;

    let output = argumentSplitter(arguments);
// catches any error messsages supplied by the argumentSplitter
    if(typeof output === 'string') return output;

    let item = output.item;

// initial check to ensure the update item is valid
    if(!~acceptedUpdateItems.indexOf(item)) return `Invalid update item [\`${item}\`]*\n *Use \`/update help\` for a list of available update items.`;

// handle the special case of the story item which only has the storyString as its data
    let storyString = output.storyString ? output.storyString : null;
    let pairsArray = output.pairsArray ? output.pairsArray : null;

    if(pairsArray){

        let flagDataPairs = {};
        pairsArray.forEach( pairString => {

            let splitIndex = pairString.indexOf(' ');

        // fixes the, albeit odd, case where "/project [item] [-invalidFlag]" with no data is passed...
            let flag = ~splitIndex ? pairString.slice(0, splitIndex) : pairString.slice(0);
            let data = pairString.slice(splitIndex+1);

            // if there is an error it is returned from errorScan as a string
            let errorScanOutput = errorScanAndModify(item, flag, data);

            if(typeof errorScanOutput === 'string') error = errorScanOutput;
        //
            if(errorScanOutput instanceof Promise){

            }

            else{
                // if there is no error errorScan returns an object containing the flag and data (in case they were modified)
                let output = errorScanOutput;
                flag = output.flag;
                data = output.data;
            }

            flagDataPairs[flag] = data;
        });

    // rule for extracting certification name from the FCC certificate url
        if(item === 'certifications' && !error){
            flagDataPairs.name = flagDataPairs.url.slice(flagDataPairs.url.lastIndexOf('/')+1)
                .split('-')
                .map(e => e = `${e.slice(0,1).toUpperCase()}${e.slice(1)}`)
                .join(' ');

        }

        return error ? error : {item: item, updateData: flagDataPairs }
    }

    return {item: item, updateData: storyString };
};

argumentSplitter = arguments => {

    if(!/^(story .+)/.test(arguments)){
        if(!~arguments.indexOf('-')) return 'No flags detected. Try `/update help` for a list of update items and flags using the /update command';

        const multipleItems = arguments.slice(0, arguments.indexOf('-')+1);
        if(!/^[A-Za-z]+( )-$/.test(multipleItems))
            return `Invalid item [\`${multipleItems.replace(/ -/, '')}\`]. You can only pass one update item at a time`;
    }

    let item = arguments.slice(0, arguments.indexOf(' '));
    const flagsAndData = arguments.slice(arguments.indexOf('-'));

// accept lowercase or camelcase item
    if(item === 'github') item = 'gitHub';

    if(item === 'story'){
        const storyString = arguments.slice(arguments.indexOf(' ')+1);
        return { item : item, storyString: storyString }
    }

    if(item === 'projects'){
        if(!(flagsAndData.includes('-n') || flagsAndData.includes('-name')))
            return `Missing a project name. All projects require at minimum a project name and GitHub repo link.\nTry again or type \`/update projects\` for more detailed help`;
        if(!(flagsAndData.includes('-r') || flagsAndData.includes('-repo')))
            return `Missing a GitHub repo. All projects require at minimum a project name and GitHub repo link.\nTry again or type \`/update projects\` for more detailed help`;
    }

    const pairsArray = flagsAndData.split(/ (?=-)/).map( e => e.replace(/-/, ''));

    return {item: item, pairsArray: pairsArray};
};


 errorScanAndModify = (item, flag, data) => {

    let expectedFlags;
    switch(item){
        case 'projects':
            expectedFlags = ['name', 'n', 'url', 'u', 'repo', 'r', 'date', 'd'];
            break;
        case 'gitHub':
        case 'blog':
        case 'portfolio':
            expectedFlags = ['url', 'u'];
            break;
        case 'certifications':
            expectedFlags = ['url', 'u', 'date', 'd'];
            break;
    }

    if(!~expectedFlags.indexOf(flag)){
        return `Invalid update flag [\`-${flag}\`] for update item [\`${item}\`].\n Try \`/update ${item}\` for a list of required and optional flags`
    }

// modification step (as needed)
    switch(true){

    // github repo
        case flag === 'repo' || flag === 'r':
            if(!/(https:\/\/github\.com\/[a-zA-Z\-_]+\/[a-zA-Z\-_]+)/.test(data) || ~data.indexOf(' '))
                return `Invalid data: \`${data}\` associated with flag [\`-${flag}\`]. Make sure a valid GitHub repo link has been added of the form  \`https://github.com/yourUserName/repoName\``;
            flag = 'gitHub';
            break;

    // github profile, blog, project, or portfolio url
        case flag === 'url' || flag === 'u':
        // check if the gitHub url is valid
            if(item === 'gitHub'){
                if(!/(https:\/\/github\.com\/)[^\. ]+/.test(data) || ~data.indexOf(' '))
                    return `Invalid gitHub profile url, ensure the url entered is of the form \`https://github.com/yourUserName\``
            }

        // check if certificate link is valid
            if(item === 'certifications')
                if(!/(https:\/\/www\.freecodecamp\.(com|org)\/[A-Za-z-]+\/((front)|(back)|(data))\-((end)|(visualization))\-(certification))/.test(data))
                    return `Invalid certificate url, must be a direct certificate link of the form \`https://www.freecodecamp.com/userName/x-x-certification\``;

        // check if general url is valid
            if(data.length > 75) return `Invalid url. Must be below 75 characters`;
            if(!/(http:\/\/|https:\/\/)(www\.)?/.test(data) || ~data.indexOf(' ')) return `Invalid data: \`${data}\` associated with flag [\`-${flag}\`]. Check that a valid and complete [\`http(s)://\`] url is being passed`;

            flag = 'url';
            break;

        case flag === 'date' || flag === 'd':
            if(!/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/.test(data))
                return `Invalid date [\`${data}\`]. Must be in \`mm/dd/yy\` format`;

            data = Date.parse(new Date(data));

            if(item === 'projects')flag = 'completedDate';
            break;
        case flag === 'n':
            flag = 'name';
            break;
    }

    return {data: data, flag: flag};
};

module.exports = {
    parse : argumentParser
};

