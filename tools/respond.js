/**
 * Created by Vampiire on 7/24/17.
 */

const val = require('./valueStringer');

// generic submit
    submit = (responseObject, valueObject, formatObject) => {
        let response = responseObject;
    };

// ------------ CHECKIN RESPONSES ------------------ //

    checkinResponse = () => {
        return {
            title: "Check In",
            pretext: "Use the following dropdown menus to define and check into your activity.",
        };
    };

    activitySelect = valueObject => {

        // console.log(`activity select \n ${JSON.stringify(valueObject)}`);

        const menuItems = ['accountability', 'pair programming', 'team meeting'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select an activity', 'activitySelect', 'kind', valueObject, menuItems)];

        return response;

    };

    // userSelect = valueObject => {
    //
    //     const menuItems = ['vampiire', 'dsglovia', 'jessec'];
    //
    //     let response = checkinResponse();
    //     response.attachments = [val.menu('Select a partner', 'userSelect', 'partners', valueObject, menuItems)];
    //
    //     return response;
    // };

    taskSelect = valueObject => {

        // console.log(`task select \n ${valueObject}`);

        const menuItems = ['code wars', 'tutorial', 'other'];

        let response = checkinResponse();
        response.attachments = [val.menu('Select a task', 'taskSelect', 'task', valueObject, menuItems)];

        return response;
    };

    submitCheckin = (payload, valueObject) => {

        // console.log(`submit checkin \n ${valueObject}`);

        valueObject = JSON.parse(valueObject);
        let response = checkinResponse();
        response.attachments = [val.button(`Check-in confirmation: ${valueObject.kind} session with ${valueObject.partners.join(', ')} to work on ${valueObject.task}`,
                                'checkInSubmit', 'Check In', 'submit', true, valueObject)];
        return response;

    };

module.exports = {
    submit : submit,
    activitySelect : activitySelect,
    // userSelect : userSelect,
    taskSelect : taskSelect,
    submitCheckin : submitCheckin
};
