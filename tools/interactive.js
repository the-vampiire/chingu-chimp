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

    let value;
    payload.actions[0].selected_options ? value = payload.actions[0].selected_options[0].value : value = payload.actions[0].value;

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
                console.log(JSON.stringify(value));
                const partners = value.partners;
                partners.forEach( user => {
                    userProfile.checkin(user, payload.channel.id, value)
                });
                response = `Successfully checked in ${partners.join(', ')}.`;

            }

            else response = respond.activitySelect(value);

            break;
    // -------------- UPDATE -------------- //
        case 'aptitudeSelect':
            response = JSON.parse(value).aptitude === 'languages' ? respond.languageSelect(value) : respond.frameworkSelect(value);
            break;
        case 'languageSelect':
        case 'frameworkSelect':
            response = respond.skillSelect(value);
            break;
        case 'levelSelect':
            response = respond.submitAptitude(value);
            break;
        case 'aptitudeSubmit':
            // handle database update or reset
            break;

    }

    return response;
};

module.exports = {
    interaction: interaction,
    process: processInteraction
};