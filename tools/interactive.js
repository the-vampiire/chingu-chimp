/**
 * Created by Vampiire on 7/6/17.
 *
 */

const checkinResponse = require('../responses/checkinResponses');
const profileResponse = require('../responses/profileResponses');
const updateResponse = require('../responses/updateResponses');
const userProfile = require('../database/profileModel').userProfile;

// ------------ REMOVE AFTER BETA TESTING -----------------------

const betaResponse = require('../Beta/betaSlashResponses');
const doneResponse = require('../Beta/doneSlashResponses');

// ------------ REMOVE AFTER BETA TESTING -----------------------


interaction = (type, valueObject) => {
    let response;

    switch(type){
        case 'checkin':
            response = checkinResponse.activitySelect(valueObject);
            break;
        case 'update':
            response = updateResponse.skillSelect({});
            break;
// ------------ REMOVE AFTER BETA TESTING -----------------------

        // case 'start':


// ------------ REMOVE AFTER BETA TESTING -----------------------
    }

    return response;
};

processInteraction = payload => {
    const type = payload.callback_id;
    const userName = payload.user.name;
    const cohortName = payload.team.domain;

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
    // SUBMIT
        case 'checkinSubmit':
            value = JSON.parse(value);

            if(value.submit){
                delete value.submit;
                const partners = value.partners;

                let promises = [];
                partners.forEach( user => {
                    promises.push(userProfile.processCheckin(user, cohortName, payload.channel.id, value));
                });

                return Promise.all(promises).then( responses => {
                    let saveResponse = ``;
                    responses.forEach( response => {
                        saveResponse += `\n${response}`
                    });

                    return saveResponse;
                })
            }

            else response = checkinResponse.activitySelect(value);

            break;

    // -------------- UPDATE SKILLS -------------- //

        case 'skillSelect':
            response = JSON.parse(value).skill === 'languages' ?
                updateResponse.languageSelect(value) :
                updateResponse.frameworkSelect(value);
            break;
        case 'languageSelect':
        case 'frameworkSelect':
            response = updateResponse.levelSelect(value);
            break;
        case 'levelSelect':
            response = updateResponse.submitSkill(value);
            break;
        case 'skillSubmit':
            value = JSON.parse(value);

            if(value.submit){
                delete value.submit;

                const processUpdateData = {};
                processUpdateData.item = `skills`;
                processUpdateData.subItem = value.skill;
                processUpdateData.updateData = {
                    name : value.name,
                    level : value.level
                };

                response = userProfile.processUpdate(userName, cohortName, processUpdateData);
            }

            else response = updateResponse.skillSelect(JSON.stringify(value));
            break;
    // -------------- PROFILE ITEMS -------------- //
        case 'profileItem':
            value = JSON.parse(value);
            response = profileResponse.profileItem(value.userName, value.item);
            break;

// ------------ REMOVE AFTER BETA TESTING -----------------------

        // case '':

// ------------ REMOVE AFTER BETA TESTING -----------------------

    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};