// API helper functions to collect and format requested data


const userProfile = require('../../../database/profileModel').userProfile;

function oneUserOneItem(userName, requestItem){
    return new Promise( (resolve, reject) => {
        userProfile.getProfileItem(userName, requestItem).then( item => {
            
            if(item) {
                item = item[requestItem];
                output = {};
                output.ok = true;
                output.body = {};
                output.body.userName = userName;
                output.body[requestItem] = item;
                
                resolve(output);
                // resolve(item);
            }
            else reject('User not found')
        });
    });
};

function oneUserBulkItems(userName, items){

    return new Promise((resolve, reject) => {

        const promises = [];
        
        
    });

};


module.exports = {
    oneUserOneItem
};