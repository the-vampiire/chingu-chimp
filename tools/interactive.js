/**
 * Created by Vampiire on 7/6/17.
 *
 */

const respond = require('./respond');
const database = require('./exporter').database;

interaction = type => {
    let response;

    // const valueObject = {};

    switch(type){
        case 'checkin':
            response = respond.activitySelect({});
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
            response = respond.userSelect(value);
            break;
        case 'userSelect':
            response = respond.taskSelect(value);
            break;
        case 'taskSelect':
            response = respond.submitCheckin(value);
            break;
        case 'checkInSubmit':
            database.
            response = `Your checkin is being processed for yourself and ${JSON.parse(value).partner}`;
            break;
    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};