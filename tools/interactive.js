/**
 * Created by Vampiire on 7/6/17.
 *
 */

const respond = require('./respond');
const database = require('./database');
const requests = require('./requests');

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
            // use API call to get partners
                // remove chance and pass all members [including user] to partners array
                    // pass partners array into the valueObject
            response = respond.userSelect(value);
            break;
        case 'userSelect':
            response = respond.taskSelect(value);
            break;
        case 'taskSelect':
            response = respond.submitCheckin(payload, value);
            break;
        case 'checkInSubmit':
            // const channelID = payload.channel.id;
            // const user = payload.user.name;
            // /*
            //
            // make a request for the users in the channel passing the channel ID from the payload object
            //      get user IDs array and iterate through to create
            //           array of user ID convert promises which will resolve into an array of usernames
            //                return this Promise.all array of promises
            //
            //
            //  then for each user call the checkin update function
            //     pass a scrubbed array of users filter the [current user] and [chance, autobot] out of the array
            //         set the partners property of the checkin data to the array of scrubbed partners
            //             update mongodb
            //  */
            //



            response = 'The check-in session is being processed for yourself and all teammates within the channel';
            break;
    }


    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};