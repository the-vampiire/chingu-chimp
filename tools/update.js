/**
 * Created by Vampiire on 8/3/17.
 *
 * Handles the parsing and error checking of the arguments passed to the update slash command
 *
 */

argumentParser = arguments => {
    const output = argumentSplitter(arguments);
    const item = output.item;
    const pairsArray = output.pairsArray;

    let flagDataPairs = {};
    pairsArray.forEach( pairString => {
        let flag = pairString.slice(0, pairString.indexOf(' '));
        let data = pairString.slice(pairString.indexOf(' ')+1);

    // analyzer function which accepts the (flag, data) and determines if the data type is correct for that flag

    // modification step (as needed)
        switch(flag){
            case 'git':
                flag = 'gitHubURL';
                break;
            case 'date':
                flag = 'completedDate';
                data = Date.parse(new Date(data))/1000;
        }

    // pair storage step
        flagDataPairs[flag] = data;
    });

    return {item: item, updateData: flagDataPairs};
};

argumentSplitter = arguments => {
    const item = arguments.slice(0, arguments.indexOf(' '));
    const pairsArray = arguments.slice(arguments.indexOf('-'))
        .replace(/(\ -)/g, '-')
        .split(/-/g)
        .splice(1);

    return {item: item, pairsArray: pairsArray};
};

let test = 'projects -name New Project -url www.test.com -git www.gittest.com -date 01/01/17';

console.log(argumentParser(test));