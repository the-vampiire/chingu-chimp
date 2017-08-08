/**
 * Created by Vampiire on 7/6/17.
 *
 */

const respond = require('./respond');
const userProfile = require('../database/profileModel').userProfile;

interaction = (type, valueObject) => {
    let response;

    switch(type){
        case 'checkin':
            response = respond.activitySelect(valueObject);
            break;
        case 'update':
            response = respond.skillSelect();
            break;
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
            response = respond.taskSelect(value);
            break;
        case 'taskSelect':
            response = respond.submitCheckin(value);
            break;
    // SUBMIT
        case 'checkInSubmit':
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
                        saveResponse += `${response}\n`
                    });

                    return saveResponse;
                });
            }

            else response = respond.activitySelect(value);

            break;

    // -------------- UPDATE SKILL -------------- //
        case 'skillSelect':
            response = JSON.parse(value).skill === 'languages' ? respond.languageSelect(value) : respond.frameworkSelect(value);
            break;
        case 'languageSelect':
        case 'frameworkSelect':
            response = respond.levelSelect(value);
            break;
        case 'levelSelect':
            response = respond.submitSkill(value);
            break;
        case 'skillSubmit':
            value = JSON.parse(value);

            let processUpdateData = {};
            processUpdateData.item = `skills`;
            processUpdateData.subItem = value.skill;
            processUpdateData.updateData = {
                name : value.name,
                level : value.level
            };

            userProfile.processUpdate(userName, cohortName, processUpdateData);

            response = `Stored ${value.skill}: ${processUpdateData.updateData.name} at skill level: ${processUpdateData.updateData.level}`;
            break;

    // -------------- UPDATE X -------------- //

    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};