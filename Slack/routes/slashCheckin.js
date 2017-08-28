const express = require('express');
const router = module.exports = express.Router();

const tools = require('../tools/exporter');

// handles the check-in process
router.post('/', (req, res) => {
    
        const body = req.body;
    
        if(tools.verify.slash(body.token)) {
    
            if(!body.text || /^(@[0-9A-Za-z-_.]+( )?)+$/.test(body.text)){
                const user = body.user_name;
    
                let valueObject = {};
                let filtered;
    
            // if user(s) are passed
                if(body.text){
                    // split the arguments and inject the user name of the user calling the check-in
                    filtered = body.text.split(' ');
                    filtered.push(`@${user}`);
                }
            // if no user is passed (self check-in)
                else filtered = [`@${user}`];
    
            // filter non-tag text and duplicate usernames
                filtered = filtered.filter( (e, i, a) => /@[0-9A-Za-z-_.]+/g.test(e) && a.indexOf(e) === i);
            // strip the '@' symbol
                filtered.forEach( (e, i, a) => a[i] = e.replace(/\@/g, ''));
    
            // set the partners property of the valueObject to the now filtered array of partner(s)
                valueObject.partners = filtered;

                // solo check-in handling here
                if(filtered.length === 1) {
                    const respond = require('../responses/checkinResponses');
                    valueObject.kind = 'Self Check-in';
                    res.json(respond.taskSelect(JSON.stringify(valueObject)));
                }

                else res.json(tools.interactive.interaction('checkin', valueObject));
            }
    
            else res.end('*Invalid checkin command format. Try `/checkin [@userName] [@otherUserName(s)]`. You do not need to tag yourself, the user calling the check-in command is automatically included*');
        }
        
        else res.end('invalid Slack token');
    });