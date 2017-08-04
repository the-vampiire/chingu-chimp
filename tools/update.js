/**
 * Created by Vampiire on 8/3/17.
 *
 * Handles the parsing and error checking of the arguments passed to the update slash command
 *
 */

argumentParser = arguments => {

    const acceptedUpdateItems = ['gitHub', 'blog', 'portfolio', 'story', 'projects', 'certifications'];
    let error;

    let output = argumentSplitter(arguments);
    let item = output.item;

// initial check to ensure the update item is valid
    if(!~acceptedUpdateItems.indexOf(item)) return `invalid update item [${item}]\n Use \`/update help\` for a list of available update items.`;

// handle the special case of the story item which only has the storyString as its data
    let storyString = output.storyString ? output.storyString : null;
    let pairsArray = output.pairsArray ? output.pairsArray : null;

    if(pairsArray){

        let flagDataPairs = {};
        pairsArray.forEach( pairString => {
            let flag = pairString.slice(0, pairString.indexOf(' '));
            let data = pairString.slice(pairString.indexOf(' ')+1);

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

        return error ? error : {item: item, updateData: flagDataPairs }
    }

    return error ? error : {item: item, updateData: storyString };
};

argumentSplitter = arguments => {
    const item = arguments.slice(0, arguments.indexOf(' '));

    if(item === 'story'){
        let storyString = arguments.slice(arguments.indexOf(' ')+1);
        return { item : item, storyString: storyString }
    }

    const pairsArray = arguments.slice(arguments.indexOf('-'))
        .replace(/(\ --)/g, '--')
        .split(/--/g)
        .splice(1);

    return {item: item, pairsArray: pairsArray};
};

errorScanAndModify = (item, flag, data) => {

    let error;
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
        return `invalid update flag [-${flag}] for update item [${item}] try \`/update ${item}\` for a list of required and optional flags`
    }

    // modification step (as needed)
    switch(true){
        case flag === 'git' || flag === 'g':
            if(!data.includes('https://www.github.com/'))
                return `invalid data [${data}] associated with flag [-${flag}] does not begin with \`https://www.github.com/\``;
            flag = 'gitHubURL';
            break;
        case flag === 'url' || flag === 'u':
            if(item === 'gitHub'){
                if(!data.includes('https://www.github.com/')) return `invalid gitHub profile url, ensure the url entered is of the form [\`https://www.github.com/yourUserName\`]`
            }
            if(!/(http:\/\/|https:\/\/)(www\.)/.test(data))
                return `invalid data [${data}] associated with flag [-${flag}]. ensure the full [\`http://www.\`] or [\`https://www.\`] url is being passed`;
            flag = 'url';
            break;
        case flag === 'date' || flag === 'd':
            if(!/[0-9]{2}\/[0-9]{2}\/[0-9]{2}/.test(data))
                return `invalid date format [${data}]. must be in \`mm/dd/yy\` format`;
            data = Date.parse(new Date(data))/1000;
            flag = 'completedDate';
            break;
        case flag === 'n':
            flag = 'name';
            break;
    }

    return {data: data, flag: flag};
};

// let test = 'projects --n New Project --u http://www.test.com --g https://www.github.com/the-vampiire/newProject --d 01/01/17';
// let test = 'story a bunch of stuff';
// let test = 'gitHub --url htttps://www.github.com/tits';

// console.log(argumentParser(test));

module.exports = {
    parse : argumentParser
};

