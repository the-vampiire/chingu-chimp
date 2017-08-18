// API helper functions to collect and format requested data


const userProfile = require('../../Database/profileModel').userProfile;

function oneUserOneItem(userName, requestItem){
    return new Promise( (resolve, reject) => {
        userProfile.getProfileItem(userName, requestItem).then( item => {
            if(item) {
                output = {};
                output.ok = true;
                output.status = 200;
                output.body = {};
                output.body.userName = userName;
                output.body[requestItem] = item;
                
                resolve(output);
            }
        }).catch( mongoError => reject('User not found'));
    });
};

function oneUserBulkItems(userName, bulkItems, requested){
    return new Promise((resolve, reject) => {
        const promises = [];
        bulkItems.forEach( item => promises.push(userProfile.getProfileItem(userName, item)));

        Promise.all(promises).then( profileItems => {

            const output = {};
            const items = [];
            
            profileItems.forEach( (profileItem, index) => {
                const itemObject = {};
                itemObject[bulkItems[index]] = profileItem;
                items.push(itemObject)
            });

        // when requested is true oneUserBulkItems is called directly from an API request
            if(requested){
                output.ok = true;
                output.status = 200;
                output.body = {};
                output.body.userName = userName;
                output.body.items = items;
            }

        // when requested is undefined then oneUserBulkItems is being called in bulkUsersBulkItems
            else {
                output.userName = userName;
                output.items = items;
            }
    
            resolve(output);

        }).catch( error => reject(error));
    });
};

function bulkUsersOneItem(bulkUsers, item){
    return new Promise((resolve, reject) => {
        const promises = [];
        bulkUsers.forEach( user => promises.push(userProfile.getProfileItem(user, item)));

        Promise.all(promises).then( itemsArray => {
            const output = {};
            output.ok = true;
            output.status = 200;
            output.body = {};
            output.body.users = [];
            itemsArray.forEach( (profileItem, index) => {
                const userAndItemObject = {};
                userAndItemObject.userName = bulkUsers[index];
                userAndItemObject[item] = profileItem;
                output.body.users.push(userAndItemObject)
            });

            resolve(output);

        }).catch( error => reject(error));

    });
};

function bulkUsersBulkItems(bulkUsers, bulkItems) {
    return new Promise((resolve, reject) => {
        
        const promises = [];
        bulkUsers.forEach( user => promises.push(oneUserBulkItems(user, bulkItems)));

        Promise.all(promises).then( userAndItemsArray => {

            const output = {};
            output.ok = true;
            output.status = 200;
            output.body = {};
            output.body.users = [];

            userAndItemsArray.forEach( userAndItems => output.body.users.push(userAndItems));

            resolve(output);

        }).catch( error => reject(error));
    });
};


module.exports = {
    oneUserOneItem,
    oneUserBulkItems,
    bulkUsersOneItem,
    bulkUsersBulkItems
};
