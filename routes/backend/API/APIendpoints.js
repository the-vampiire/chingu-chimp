
const express = require('express');
const router = module.exports = express.Router();

const api = require('./api');

router.get('/item', (req, res) => {

    const request = req.query;
    let error = {};

// accepted request content 
    const chinguAPIKey = request.key;
    const userName = request.userName;
    const profileItem = request.profileItem;
    const bulkItems = request.bulkItems;
    const bulkUsers = request.bulkUsers;

    if(chinguAPIKey === 'test'){
        
    // multiple users
        if(bulkUsers){

        // process bulk users request for bulk items
            if(bulkItems){
                // bulkUsersAndItems
            }

            else if(!profileItem) error = APIerror('item', error, request);
            
            else if(!userName) error = APIerror('user', error, request);
       
        // process bulk users request for a single item
            else{
                // bulkUsersOneItem
            }
        }

    // one user
        else {
        // process a bulk items request for a single user
            if(bulkItems){
                oneUserBulkItems(userName, bulkItems)
                .then(output => res.json(output))
                .catch(mongoError => res.json(APIerror('mongo', error, request, mongoError)))
            }

            else if(!profileItem) error = APIerror('item', error, request);

        // process a request for a single user and single item
            else api.oneUserOneItem(userName, profileItem)
                .then( output => res.json(output))
                .catch( mongoError => res.json(APIerror('mongo', error, request, mongoError)));
        }
    }

    else error = APIerror('key', error, request);
    
    if(error.error) res.json(error);
});

router.get('/', (req, res) => {
    const request = require('request');
    const queries = req.query;

// // test get one user one item
//     request({
//        uri: 'https://65974b37.ngrok.io/API/item',
//        method: 'GET',
//        qs: { key: 'test', userName:'tits', profileItem: 'projects' },
//     }, (err, returned) => {
//         res.json(JSON.parse(returned.body));
//     });

// sample bulk item request format (one user)
    // request.get({url: 'https://8edff876.ngrok.io/API/item', 
    // form: {  APIkey: process.env.ChinguAPIkey, user:'vampiire', bulkItems: ['projects', 'certifications'] }}, 
    // (err, returned) => {
    //         if(typeof returned.body === 'string') res.send(returned.body);
    //         else res.json(JSON.parse(returned.body));
    // });

});


APIerror = (type, error, request, mongoError) => {

    error.ok = false;
    error.originalRequest = request;

    switch(type){
        case 'item':
            error.error = 'Requests must include either an item or a bulk items array';
            break;
        case 'user':
            error.error = 'Requests must include either a user name or a bulk users array';
            break;
        case 'key':
            error.error = 'Invalid API key';
            break;
        case 'mongo':
            error.error = mongoError;
    }

    return error;
};

// APIsuccess = (output, content, request) => {
//     const item = request.item;

//     output.ok = true;
//     output.request = request;

//     output.body = {};
//     output.userName = request.userName;
//     output[request.item] = content;

//     return output;
// };