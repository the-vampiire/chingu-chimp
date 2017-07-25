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


    const type = payload.callback_id;
    let value;
    let response;

    if(type === 'checkInSubmit') {
        value = payload.actions[0].value;
       return `Your checkin is being processed for yourself and ${JSON.parse(value).partner}`;
    }else{
        value = payload.actions[0].selected_options[0].value;
    }

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
            console.log(payload);
            response = `Your checkin is being processed for yourself and @${JSON.parse(value).partner}`;
            // process database submission
            break;
    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};