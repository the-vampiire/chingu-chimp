
const express = require('express');
const router = module.exports = express.Router();

const verifyKey = require('./tools/verify');
const verifyItems = require('./tools/verifyItems');

// GET [request data from the database] 
    // bulk users bulk items
    // bulk users one item
    // one user bulk items
    // one user one item
router.get('/request', (req, res) => {

    const GET = require('./tools/getMethods');

    const request = req.query;
    let error = {};
    
    // accepted request content 
    const chinguAPIKey = request.key;
    const userName = request.userName;
    const profileItem = request.profileItem;
    const bulkItems = request.bulkItems;
    const bulkUsers = request.bulkUsers;

    if(verifyKey(chinguAPIKey)){
    
    // bulk users
        if(bulkUsers){  
        // process bulk users request for bulk items
            if(bulkItems){
                const itemScan = verifyItems(bulkItems);
                if(itemScan === true){
                    GET.bulkUsersBulkItems(bulkUsers, bulkItems)
                    .then( output => res.json(output))
                    .catch( mongoError => res.json(APIerror('mongo', error, request, mongoError)));
                }
                else error = APIerror('bad item', error, itemScan);
            }

            else if(!profileItem) error = APIerror('item', error, request);
       
        // process bulk users request for a single item
            else{
                const itemScan = verifyItems(profileItem);
                if(itemScan === true){
                    GET.bulkUsersOneItem(bulkUsers, profileItem)
                    .then( output => res.json(output))
                    .catch( mongoError => res.json(APIerror('mongo', error, request, mongoError)));
                }
                else error = APIerror('bad item', error, itemScan);  
            }
        }

    // one user
        else {

            if(!userName) error = APIerror('user', error, request);

        // process a bulk items request for a single user
            if(bulkItems){
                const itemScan = verifyItems(bulkItems);
                if(itemScan === true){
                    GET.oneUserBulkItems(userName, bulkItems, true)
                    .then(output => res.json(output))
                    .catch(mongoError => res.json(APIerror('mongo', error, request, mongoError)))
                }
                else error = APIerror('bad item', error, itemScan);  
            }

            else if(!profileItem) error = APIerror('item', error, request);

        // process a request for a single user and single item
            else {
                const itemScan = verifyItems(profileItem);
                if(itemScan === true){
                    GET.oneUserOneItem(userName, profileItem)
                    .then( output => res.json(output))
                    .catch( mongoError => res.json(APIerror('mongo', error, request, mongoError)));
                }
                else error = APIerror('bad item', error, itemScan); 
            }
        }
    }

    else error = APIerror('key', error, request);
    
    if(error.error) res.json(error);
});


// PUT [update data in the database]
router.put('/update', (req, res) => {

    const request = req.body;
    let error = {};

    // accepted request content
    const chinguAPIKey = request.key;

    if(verifyKey(chinguAPIKey)){
        
    }

    else error = APIerror('key', error, request);

    if(error.error) res.json(error);
});

// errror handler
function APIerror(type, error, specificErrorMessage){

    error.ok = false;

    switch(type){
        case 'item':
            error.status = 400;
            error.error = 'Requests must include either an item or a bulk items array';
            break;
        case 'user':
            error.status = 400;
            error.error = 'Requests must include either a user name or a bulk users array';
            break;
        case 'key':
            error.status = 401;
            error.error = 'Invalid API key';
            break;
        case 'bad item':
            error.status = 401;
            error.error = `Invalid profile item [${specificErrorMessage}] requested`
            break;
        case 'mongo':
            error.status = 404;
            error.error = specificErrorMessage;
    }

    return error;
};


// TESTING
router.get('/', (req, res) => {
        const request = require('request');
        const queries = req.query;

// TESTING GET requests
    // test get one user one item
    //     request({
    //        uri: 'https://65974b37.ngrok.io/API/item',
    //        method: 'GET',
    //        qs: { key: 'test', userName:'vampiire', profileItem: 'projects' },
    //     }, (err, returned) => {
    //         res.json(JSON.parse(returned.body));
    //     });

    // // test get one user with bulk items
    //     request({
    //        uri: 'https://65974b37.ngrok.io/API/item',
    //        method: 'GET',
    //        qs: { key: 'test', userName:'vampiire', bulkItems: ['blog', 'projects', 'portfolio'] },
    //     }, (err, returned) => {
    //         res.json(JSON.parse(returned.body));
    //     });

    // // test get bulk users with one item
    //     request({
    //        uri: 'https://65974b37.ngrok.io/API/item',
    //        method: 'GET',
    //        qs: { key: 'test', bulkUsers: ['vampiire', 'chance'], profileItem: 'blog' },
    //     }, (err, returned) => {
    //         res.json(JSON.parse(returned.body));
    //     });

    // test get bulk users with bulk items
    request({
        uri: 'https://1375fa97.ngrok.io/API/request', method: 'GET',
        qs: { key: 'test', bulkUsers: ['vampiire', 'dsegovia90', 'jessec'], 
        bulkItems: ['blog', 'github', 'tits'] }}, 
        
        (err, returned) => {
            res.json(JSON.parse(returned.body));
     });


// TESTING PUT requests
    // request(
    //     { uri: 'https://1375fa97.ngrok.io/API/update', method: 'PUT',
    //     form: {key: 'tits', userName: 'vampiire', profileItem: 'currentStreak'}},
    //     (error, response) => {
    //         if(error) res.json(error);
    //         else res.json(response);
    //     }
    // )

});

