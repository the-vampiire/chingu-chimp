/**
 * Created by Vampiire on 7/6/17.
 *
 */

const checkinResponse = require('../responses/checkinResponses');
const profileResponse = require('../responses/profileResponses');
const updateResponse = require('../responses/updateResponses');

const userProfile = require('../../Database/profileModel').userProfile;

// Initial interaction message 
interaction = (type, valueObject) => {
    let response;

    switch(type){
        case 'checkin':
            response = checkinResponse.activitySelect(valueObject);
            break;
        case 'update':
            response = updateResponse.skillSelect({});
            break;
    }

    return response;
};

// Subsequent interaction messages
processInteraction = payload => {
    const type = payload.callback_id;

    const userName = payload.user.name;
    const userID = payload.user.id;
    const channelID = payload.channel.id;
    const cohortName = payload.team.domain;
    const teamID = payload.team.id;

    let value = payload.actions[0].selected_options ?
        payload.actions[0].selected_options[0].value : payload.actions[0].value;

    let response;

    switch(type){
    // -------------- CHECKIN -------------- //
        case 'activitySelect':
            response = checkinResponse.taskSelect(value);
            break;
        case 'taskSelect':
            response = checkinResponse.submitCheckin(value);
            break;
    // CHECk-IN SUBMIT
        case 'checkinSubmit':
            value = JSON.parse(value);

            if(value.submit === true){
                delete value.submit;
                const partners = value.partners;
                
                const cohortDetails = {};
                cohortDetails.channelID = channelID;
                cohortDetails.cohortName = cohortName;
                cohortDetails.userID = userID;
                cohortDetails.teamID = teamID;

                const promises = [];
                partners.forEach( user => {
                    promises.push(userProfile.processCheckin(user, value, cohortDetails));
                });

                return Promise.all(promises).then( responses => {
                    let saveResponse = ``;
                    responses.forEach( response => {
                        saveResponse += `\n${response}`
                    });
                    return saveResponse;
                })
            }

            else if(value.submit === 'cancel') response = '*Check-in cancelled*';
        
            else response = checkinResponse.activitySelect(value);

            break;

    // -------------- UPDATE SKILLS -------------- //
        case 'skillSelect':
            switch(JSON.parse(value).skill){
                case 'frameworks':
                    response = updateResponse.frameworkSelect(value);
                    break;
                case 'languages':
                    response = updateResponse.languageSelect(value);
                    break;
                case 'technologies':
                    response = updateResponse.technologySelect(value);
                    break;
            }
            break;
        case 'technologySelect':
        case 'languageSelect':
        case 'frameworkSelect':
            response = updateResponse.levelSelect(value);
            break;
        case 'levelSelect':
            response = updateResponse.submitSkill(value);
            break;
    // SKILL SUBMIT
        case 'skillSubmit':
            value = JSON.parse(value);

            if(value.submit === true){
                delete value.submit;

                const processUpdateData = {};
                processUpdateData.item = `skills`;
                processUpdateData.subItem = value.skill;
                processUpdateData.updateData = {
                    name : value.name,
                    level : value.level
                };

                const cohortDetails = {};
                cohortDetails.cohortName = cohortName;
                cohortDetails.userID = userID;
                cohortDetails.teamID = teamID;

                response = userProfile.processUpdate(userName, 
                    processUpdateData, cohortDetails);
            }

            else if(value.submit === 'cancel') response = `*Skills update cancelled.*`
    
            else response = updateResponse.skillSelect(JSON.stringify(value));
            break;

    // -------------- PROFILE CARD -------------- //
        case 'profileCard':
            value = JSON.parse(value);
            response = profileResponse.profileCard(value.userName);
            break;

    // -------------- PROFILE ITEM -------------- //
        case 'profileItem':
            value = JSON.parse(value);
            response = profileResponse.profileItem(value.userName, value.item);
            break;

    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};