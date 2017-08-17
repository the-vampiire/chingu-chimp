// API helper functions to collect and format requested data


const userProfile = require('../../../database/profileModel').userProfile;

function oneUserOneItem(userName, requestItem){
    return new Promise( (resolve, reject) => {
        userProfile.getProfileItem(userName, requestItem).then( item => {
            if(item) {
                output = {};
                output.ok = true;
                output.body = {};
                output.body.userName = userName;
                output.body[requestItem] = item;
                
                resolve(output);
            }
        })
        .catch( mongoError => reject('User not found'));
    });
};

function oneUserBulkItems(userName, items){

    return new Promise((resolve, reject) => {

        const promises = [];
        items.forEach( item => promises.push(userProfile.getProfileItem(userName, item)));

        Promise.all(promises)
        .then( profileItems => {

            // resolve(profileItems);

            const output = {};
            output.ok = true;
            output.body = {};
            output.body.items = [];

            profileItems.forEach( (profileItem, index) => {
                const itemObject = {};
                itemObject[items[index]] = profileItem;
                output.body.items.push(itemObject)
            });

            resolve(output);

        })
        .catch( error => reject(error));
    })

};


module.exports = {
    oneUserOneItem,
    oneUserBulkItems
};