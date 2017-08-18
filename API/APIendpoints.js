
const express = require('express');
const router = module.exports = express.Router();

// itemScan is the returned value of verifyItems
        // if an invalid item is found then that item is returned to be processed by APIerror
        // if all requested item(s) are valid then itemScan is true
const verifyItems = require('./tools/verifyItems');
const verifyKey = require('./tools/verify');
const GET = require('./tools/getMethods');
const APIerror = require('./tools/APIerror');

router.get('/request', (req, res) => {
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
                    .catch( mongoError => res.json(APIerror('userNotFound', error, request, mongoError)));
                }
                else error = APIerror('invalidItem', error, itemScan);
            }

            else if(!profileItem) error = APIerror('itemMissing', error, request);
       
        // process bulk users request for a single item
            else{
                const itemScan = verifyItems(profileItem);
                if(itemScan === true){
                    GET.bulkUsersOneItem(bulkUsers, profileItem)
                    .then( output => res.json(output))
                    .catch( mongoError => res.json(APIerror('userNotFound', error, request, mongoError)));
                }
                else error = APIerror('invalidItem', error, itemScan);  
            }
        }

    // one user
        else {

            if(!userName) error = APIerror('userMissing', error, request);

        // process a bulk items request for a single user
            if(bulkItems){
                const itemScan = verifyItems(bulkItems);
                if(itemScan === true){
                    GET.oneUserBulkItems(userName, bulkItems, true)
                    .then(output => res.json(output))
                    .catch(mongoError => res.json(APIerror('userNotFound', error, request, mongoError)))
                }
                else error = APIerror('invalidItem', error, itemScan);  
            }

            else if(!profileItem) error = APIerror('itemMissing', error, request);

        // process a request for a single user and single item
            else {
                const itemScan = verifyItems(profileItem);
                if(itemScan === true){
                    GET.oneUserOneItem(userName, profileItem)
                    .then( output => res.json(output))
                    .catch( mongoError => res.json(APIerror('userNotFound', error, request, mongoError)));
                }
                else error = APIerror('invalidItem', error, itemScan); 
            }
        }
    }

    else error = APIerror('invalidKey', error, request);
    
    if(error.error) res.json(error);
});


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

    // // test get bulk users with bulk items
    // request({
    //     uri: 'https://1375fa97.ngrok.io/API/request', method: 'GET',
    //     qs: { key: 'test', bulkUsers: ['vampiire', 'dsegovia90', 'jessec'], 
    //     bulkItems: ['blog', 'github', 'tits'] }}, 
        
    //     (err, returned) => {
    //         res.json(JSON.parse(returned.body));
    //  });


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