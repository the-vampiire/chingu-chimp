const express = require('express');
const router = module.exports = express.Router();

const tools = require('../tools/exporter');
const updateResponse = require('../responses/updateResponses');

const userProfile = require('../../Database/profileModel').userProfile;

// handles updating user profiles / interactions
router.post('/', (req, res) => {

        const body = req.body;
        const userName = body.user_name;
        const cohortName = body.team_domain;
        const arguments = body.text;
    
        if(tools.verify.slash(body.token)){
            if(~arguments.indexOf(' ')){
    
                if(/^(skills .+)/.test(arguments)) res.end('*\`/update skills\` does not take any additional parameters*');
                else if(/^(picture .+)/.test(arguments)) res.end('*\`/update picture\` does not take any additional parameters*');
    
                else{
                    let parserOutput = tools.argumentParser.parse(arguments);
    
                    if(typeof parserOutput === 'string') res.end(parserOutput);
                    else userProfile.processUpdate(userName, cohortName, parserOutput)
                        .then( successMessage => res.end(successMessage))
                        .catch( errorMessage => res.end(errorMessage))
                }
            }
    
            else{
                if(arguments === 'help' || !arguments) {
                    const helpResponse = updateResponse.helpResponse('help');
                    if(typeof helpResponse === 'string') res.end(helpResponse);
                    else res.json(helpResponse);
                }
    
                else if(arguments === 'skills'){
                    const output = tools.interactive.interaction(('update'));
                    if(output instanceof Promise) output.then( response => {
                        if(typeof response === 'string') res.end(response);
                        else res.json(response);
                    });
                    else res.json(output);
                }
    
                else if(arguments === 'picture'){
                    const userID = body.user_id;
                    const userProfile = require('./database/profileModel').userProfile;
    
                    tools.requests.userData('pic', userID).then( picObject => {
                        let data = { item: 'profilePic', updateData : picObject };
                        userProfile.processUpdate(userName, cohortName, data)
                            .then( successMessage => res.end(successMessage))
                            .catch( errorMessage => res.end(errorMessage))
                    });
                }
                else {
                    const helpResponse = updateResponse.helpResponse(arguments);
                    if(typeof helpResponse === 'string') res.end(helpResponse);
                    else res.json(helpResponse);
                }
            }
        }
    
        else res.end('invalid Slack token');
    });
