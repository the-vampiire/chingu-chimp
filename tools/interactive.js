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
    }

    return response;
};

processInteraction = payload => {
    const type = payload.callback_id;

    let value;
    payload.actions[0].selected_options ? value = payload.actions[0].selected_options[0].value : value = payload.actions[0].value;

    let response;

    switch(type){
        case 'activitySelect':
            response = respond.taskSelect(value);
            break;
        // case 'userSelect':
        //     response = respond.taskSelect(value);
        //     break;
        case 'taskSelect':
            response = respond.submitCheckin(payload, value);
            break;
        case 'checkInSubmit':
            value = JSON.parse(value);
            const partners = value.partners;
            partners.forEach( user => {
                userProfile.checkIn(user, payload.channel.id, value)
            });
            response = `Successfully checked in ${partners.join(', ')}.`;
            break;
    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};