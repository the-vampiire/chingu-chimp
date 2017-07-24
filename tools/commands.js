/**
 * Created by Vampiire on 7/6/17.
 *
 * all data commands
 *
 *
 * interactive message payload structure
 *  field name: payload.actions[0].name
 *  field value: payload.actions[0].selected_options[0].value
 *
 *
 */

const respond = require('./responses');

// console.log(tools.response.activitySelect({}));

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
    let type = payload.callback_id;
    let name = payload.actions[0].name;
    let value = payload.actions[0].selected_options[0].value;

    let response;

    switch(type){
        case 'activitySelect':
           response = respond.userSelect(value);
           break;
        case 'userSelect':
            response = respond.taskSelect(value);

    }

    console.log(value);

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};