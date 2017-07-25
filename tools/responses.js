/**
 * Created by Vampiire on 7/24/17.
 */

const val = require('./valueStringer');

// generic submit
    submit = (responseObject, valueObject, formatObject) => {
        let response = responseObject;
    };

// ------------ checkin ------------------ //

    checkIn = () => {
        return {
            title: "Check In",
            pretext: "Use the following dropdown menus to define and" +
            "check into your activity.",
        };
    };

    activitySelect = valueObject => {

        const fields = {
            text: 'Select an activity',
            callback_id: 'activitySelect',
            attachment_type: "default",
            actions: [{
                name: 'type',
                type: 'select',
                data_source: 'static'
            }]
        };

        const options = ['accountability', 'pair programming', 'team meeting'];

        let response = checkIn();
        response.attachments = [val.attachment(valueObject, fields, options )];

        return response;
    };

    userSelect = valueObject => {

        const fields = {
            text: "Select a partner:",
            callback_id: "userSelect",
            attachment_type: "default",
            actions: [{
                name: "partner",
                type: "select",
                data_source: 'static'
            }]
        };

        const options = ['vampiire', 'dsglovia', 'jessec'];

        let response = checkIn();
        response.attachments = [val.attachment(valueObject, fields, options )];

        return response;
    };

    taskSelect = valueObject => {

        const fields = {
            text: "Select a task:",
            callback_id: "taskSelect",
            attachment_type: "default",
            actions: [{
                name: "task",
                type: "select",
                data_source: 'static'
            }]
        };

        const options = ['code wars', 'tutorial', 'other'];

        let response = checkIn();
        response.attachments = [val.attachment(valueObject, fields, options )];

        return response;
    };

    submitCheckin = valueObject => {

        const stuff = JSON.parse(valueObject);

        const fields = {
            text: `Check into: ${stuff.type} Session with ${stuff.partner} to work on ${stuff.task}`,
            callback_id: "checkInSubmit",
            color: "#3AA3E3",
            attachment_type: "default",
            actions: [{
                text: 'Check in',
                name: "task",
                type: "button",
                value: val.stringer(valueObject, 'submit', 'true')
            }]
        };

        let response = checkIn();
        response.attachments = [fields];

        console.log(response);

        return response;

    };

module.exports = {
    submit : submit,
    activitySelect : activitySelect,
    userSelect : userSelect,
    taskSelect : taskSelect,
    submitCheckin : submitCheckin
};
