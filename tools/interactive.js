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
            response = respond.submitCheckin(value);
            break;
        case 'checkInSubmit':
            // const channelID = payload.channel.id;
            // const user = payload.user.name;
            // /*
            //  get user IDs
            //     create array of user ID convert promises
            //         resolve all into an array of user names
            //
            //  for each user call the checkin update function
            //     pass a scrubbed array of users filter the [current user] and [chance] out of the array
            //         set the partners property of the checkin data to the array
            //             update mongodb
            //  */
            //
            // console.log(payload);
           // requests.channel(payload.channel.id).then( IDs => {
           //      let promises = [];
           //      IDs.forEach( ID => promises.push(requests.convertID(ID)));
           //      return Promise.all(promises);
           //  }).then( partners => {
           //      value = JSON.parse(value);
           //      value.partners = partners.filter( partner => partner !== payload.user.name && partner !== 'chance' );
           //
           //      let partnersString;
           //      value.partners.forEach(e => partnersString += `e \n`);
           //      response = `Your checkin is being processed for yourself and ${partnersString}`;
           //      // database update function
           //      //         // search for user
           //      //         // pass value object
           //  });

            // break;
    }


    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};