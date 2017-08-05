/**
 * Created by Vampiire on 7/6/17.
 *
 */

const respond = require('./respond');
const requests = require('./requests');
const userProfile = require('../database/profileModel').userProfile;

interaction = (type, valueObject) => {
    let response;

    switch(type){
        case 'checkin':
            response = respond.activitySelect(valueObject);
            break;
        case 'update':
            response = respond.aptitudeSelect();
            break;
    }

    return response;
};

processInteraction = payload => {
    const type = payload.callback_id;
    const userName = payload.user.name;

    let value = payload.actions[0].selected_options ?
        payload.actions[0].selected_options[0].value : payload.actions[0].value;

    let response;

    switch(type){

    // -------------- CHECKIN -------------- //
        case 'activitySelect':
            response = respond.taskSelect(value);
            break;
        // case 'userSelect':
        //     response = respond.taskSelect(value);
        //     break;
        case 'taskSelect':
            response = respond.submitCheckin(value);
            break;
    // submit
        case 'checkInSubmit':
            value = JSON.parse(value);

            if(value.submit){
                delete value.submit;
                const partners = value.partners;
                partners.forEach( user => {
                    userProfile.processCheckin(user, payload.channel.id, value)
                });
                response = `Successfully checked in ${partners.join(', ')}.`;

            }

            else response = respond.activitySelect(value);

            break;

    // -------------- UPDATE APTITUDE -------------- //
        case 'aptitudeSelect':
            response = JSON.parse(value).aptitude === 'languages' ? respond.languageSelect(value) : respond.frameworkSelect(value);
            break;
        case 'languageSelect':
        case 'frameworkSelect':
            response = respond.levelSelect(value);
            break;
        case 'levelSelect':
            response = respond.submitAptitude(value);
            break;
        case 'aptitudeSubmit':
            value = JSON.parse(value);
        // form the item and updateData pair expected by the userProfile processUpdate() method
            let processUpdateData = {};
            processUpdateData.item = `aptitudes`;
            processUpdateData.subItem = value.aptitude;
            processUpdateData.updateData = {
                name : value.name,
                level : value.level
            };

            userProfile.processUpdate(userName, processUpdateData);

            response = `Stored ${value.aptitude}: ${processUpdateData.updateData.name} at skill level: ${processUpdateData.updateData.level}`;
            break;

    // -------------- UPDATE X -------------- //

    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};