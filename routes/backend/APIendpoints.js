
const express = require('express');
const router = module.exports = express.Router();


const userProfile = require('../../database/profileModel').userProfile;

router.post('/item', (req, res) => {

    const request = req.body;
    const APIkey = request.APIkey;

    const userName = request.userName;
    const item = request.item;

    if(APIkey === 'aksdhad'){
        if(!userName) res.end('Missing username');
        else if(!item) res.end('Missing item');
        else {
            if(bulk){
                
            }
            else userProfile.getProfileItem(userName, item).then( item => res.json(item));
        }   
    }
    else res.end('Invalid API key.');

});

router.get('/', (req, res) => {
    const request = require('request');
    const queries = req.query;

// sample single item request format
    // request.post({url: 'https://8edff876.ngrok.io/API/item', 
    //     form: {  APIkey: 'aksdhad', userName:'vampiire', profileItem: 'projects' }}, 
    //     (err, returned) => {
    //             if(typeof returned.body === 'string') res.send(returned.body);
    //             else res.json(JSON.parse(returned.body));
    // });

// sample bulk item request format (one user)
    request.post({url: 'https://8edff876.ngrok.io/API/item', 
    form: {  APIkey: 'aksdhad', user:'vampiire', item: 'projects' }}, 
    (err, returned) => {
            if(typeof returned.body === 'string') res.send(returned.body);
            else res.json(JSON.parse(returned.body));
    });

});