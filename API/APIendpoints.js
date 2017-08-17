
const express = require('express');
const router = module.exports = express.Router();

const verified = require('./tools/verify');

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

    if(verified(chinguAPIKey)){
    
    // bulk users
        if(bulkUsers){  

        // process bulk users request for bulk items
            if(bulkItems){
                GET.bulkUsersBulkItems(bulkUsers, bulkItems)
                .then( output => res.json(output))
                .catch( mongoError => APIerror('mongo', error, request, mongoError));
            }

            else if(!profileItem) error = APIerror('item', error, request);
       
        // process bulk users request for a single item
            else{
                GET.bulkUsersOneItem(bulkUsers, profileItem)
                .then( output => res.json(output))
                .catch( mongoError => APIerror('mongo', error, request, mongoError));
            }
        }

    // one user
        else {

            if(!userName) error = APIerror('user', error, request);

        // process a bulk items request for a single user
            if(bulkItems){
                GET.oneUserBulkItems(userName, bulkItems, true)
                .then(output => res.json(output))
                .catch(mongoError => res.json(APIerror('mongo', error, request, mongoError)))
            }

            
            else if(!profileItem) error = APIerror('item', error, request);

        // process a request for a single user and single item
            else GET.oneUserOneItem(userName, profileItem)
                .then( output => res.json(output))
                .catch( mongoError => res.json(APIerror('mongo', error, request, mongoError)));
        }
    }

    else error = APIerror('key', error, request);
    
    if(error.error) res.json(error);
});


// PUT [update data in the database]
router.put('/update', (req, res) => {

    const request = req.body;
    const chinguAPIKey = request.key;

    if(verified(chinguAPIKey)){
        
    }
});

// errror handler
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



// // TESTING
// router.get('/', (req, res) => {
    //     const request = require('request');
    //     const queries = req.query;

    // test get one user one item
        // request({
        //    uri: 'https://65974b37.ngrok.io/API/item',
        //    method: 'GET',
        //    qs: { key: 'test', userName:'vampiire', profileItem: 'projects' },
        // }, (err, returned) => {
        //     res.json(JSON.parse(returned.body));
        // });

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

    // // test get bulk users with bulk items
    // request({
    //     uri: 'https://65974b37.ngrok.io/API/item', method: 'GET',
    //     qs: { key: 'test', bulkUsers: ['vampiire', 'dsegovia90', 'chance', 'jessec'], 
    //     bulkItems: ['blog', 'bestStreak', 'skills'] }}, 
        
    //     (err, returned) => {
    //         res.json(JSON.parse(returned.body));
    //  });

// });