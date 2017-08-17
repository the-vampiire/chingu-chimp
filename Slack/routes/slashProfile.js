const express = require('express');
const router = module.exports = express.Router();

const tools = require('../tools/exporter');
const profileResponse = require('../responses/profileResponses');

// handles profile requests / interactions
router.post('/', (req, res) => {
    
        const body = req.body;
        const text = body.text;
    
        if(tools.verify.slash(body.token)){
    
            if(text === 'help' || !text) res.json(profileResponse.profileHelp());
        
            if(text) {
                if (/^\@[0-9A-Za-z-_.]+( share)?( (story|projects|skills|certifications|(gitHub|github)|blog|portfolio|badges))?$/.test(text)) {
    
                    let share = false;
                    let item;
    
                    const arguments = text.split(' ');
                    let userName = arguments[0].replace(/@/, '');
    
                    if(arguments[1]){
                        if(~arguments[1].indexOf('share')){
                            share = true;
                            if(arguments[2]) item = arguments[2];
                        }
                        else item = arguments[1];
                    }

                // accept lowercase but process downstream in camelcase (user request)
                    if(item === 'github') item = 'gitHub';
    
                    if(item) profileResponse.profileItem(userName, item, share).then( response => res.json(response) );
                    else profileResponse.profileCard(userName, share).then( response => res.json(response));
    
                }
    
                else res.end(`[\`${text}\`] is not a valid profile request.\nTry again with the format \`/profile <@userName> [share] [profile item]\` or try \`/profile help\``);
            }
        }
        
        else res.end('invalid Slack token');
    });
    