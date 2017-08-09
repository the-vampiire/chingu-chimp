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
* */

argumentParser = arguments => {

    const acceptedUpdateItems = ['gitHub', 'blog', 'portfolio', 'story', 'projects', 'certifications'];
    let error;

    let output = argumentSplitter(arguments);
// catches any error messsages supplied by the argumentSplitter
    if(typeof output === 'string') return output;

    let item = output.item;

// initial check to ensure the update item is valid
    if(!~acceptedUpdateItems.indexOf(item)) return `invalid update item [\`${item}\`]\n Use \`/update help\` for a list of available update items.`;

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
            if(typeof errorScanOutput === 'string'){
                error = errorScanOutput;
            }else{
                // if there is no error errorScan returns an object containing the flag and data (in case they were modified)
                let output = errorScanOutput;
                flag = output.flag;
                data = output.data;
            }

            flagDataPairs[flag] = data;
        });

    // rule for extracting certification name from the FCC certificate url
        if(item === 'certifications'){
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

    const item = arguments.slice(0, arguments.indexOf(' '));
    const flagsAndData = arguments.slice(arguments.indexOf('-'));

// story is a simple string with no flags
    if(item === 'story'){
        const storyString = arguments.slice(arguments.indexOf(' ')+1);
        return { item : item, storyString: storyString }
    }

    if(item === 'projects' && !(flagsAndData.includes('-g') || flagsAndData.includes('-git')))
        return `*No GitHub repo link detected for this project. All projects require at minimum a name and GitHub repo link.*\n*Try again or type \`/update projects\` for help*`;

    const pairsArray = flagsAndData.split(/ (?=-)/).map( e => e.replace(/-/, ''));

    return {item: item, pairsArray: pairsArray};
};

// * only one of each flag
// * gitHub URL is required for projects

 errorScanAndModify = (item, flag, data) => {

    let expectedFlags;
    switch(item){
        case 'projects':
            expectedFlags = ['name', 'n', 'url', 'u', 'git', 'g', 'date', 'd'];
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
        return `invalid update flag [\`-${flag}\`] for update item [\`${item}\`].\n Try \`/update ${item}\` for a list of required and optional flags`
    }

    // modification step (as needed)
    switch(true){
        case flag === 'git' || flag === 'g':
            if(!data.includes('https://www.github.com/'))
                return `invalid data: \`${data}\` associated with flag [\`-${flag}\`] does not begin with \`https://www.github.com/\``;
            flag = 'gitHub';
            break;
        case flag === 'url' || flag === 'u':
        // check if the gitHub url is valid
            if(item === 'gitHub'){
                if(!data.includes('https://www.github.com/')) return `invalid gitHub profile url, ensure the url entered is of the form [\`https://www.github.com/yourUserName\`]`
            }
            if(!/(http:\/\/|https:\/\/)(www\.)?/.test(data))
                return `invalid data: \`${data}\` associated with flag [\`-${flag}\`]. ensure the full [\`http://www.\`] or [\`https://www.\`] url is being passed`;
            flag = 'url';
            break;
        case flag === 'date' || flag === 'd':
            if(!/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/.test(data))
                return `*invalid date format [${data}]. must be in \`mm/dd/yy\` format*`;
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

