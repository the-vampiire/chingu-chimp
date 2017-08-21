const express = require('express');
const router = module.exports = express.Router();

const tools = require('../tools/exporter');
const updateResponse = require('../responses/updateResponses');

const userProfile = require('../../Database/profileModel').userProfile;

// handles updating user profiles / interactions
router.post('/', (req, res) => {

        const body = req.body;
        const arguments = body.text;

        const userName = body.user_name;
        const userID = body.user_id;
        const cohortName = body.team_domain;
        const teamID = body.team_id;
    
        if(tools.verify.slash(body.token)){
            if(~arguments.indexOf(' ')){
    
                if(/^(skills .+)/.test(arguments)) res.end('*\`/update skills\` does not take any additional parameters*');
                else if(/^(picture .+)/.test(arguments)) res.end('*\`/update picture\` does not take any additional parameters*');
    
                else{
                    const parserOutput = tools.argumentParser.parse(arguments);
    
                    if(typeof parserOutput === 'string') res.end(parserOutput);
                    else {
                        const cohortDetails = {};
                        cohortDetails.cohortName = cohortName;
                        cohortDetails.userID = userID;
                        cohortDetails.teamID = teamID;

                        userProfile.processUpdate(userName, parserOutput, cohortDetails)
                        .then( successMessage => res.end(successMessage))
                        .catch( errorMessage => res.end(errorMessage))
                    }
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
                    })
                    .catch( error => console.log(error));
                    else res.json(output);
                }
    
                else if(arguments === 'picture'){
                    
                    const userID = body.user_id;
                    tools.requests.userData('pic', userID)
                    .then( picObject => {
                        let data = { item: 'profilePic', updateData : picObject };

                        const cohortDetails = {};
                        cohortDetails.cohortName = cohortName;
                        cohortDetails.userID = userID;
                        cohortDetails.teamID = teamID;

                        userProfile.processUpdate(userName, data, cohortDetails)
                            .then( successMessage => res.end(successMessage))
                            .catch( errorMessage => res.end(errorMessage))
                    })
                    .catch( error => console.log(error));
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
