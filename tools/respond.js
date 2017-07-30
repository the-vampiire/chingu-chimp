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
            pretext: "Use the following dropdown menus to define and check into your activity.",
        };
    };

    activitySelect = valueObject => {

        const menuItems = ['accountability', 'pair programming', 'team meeting'];

        let response = checkIn();
        response.attachments = [val.menu('Select an activity', 'activitySelect', 'type', valueObject, menuItems)];

        return response;
    };

    userSelect = valueObject => {

        const menuItems = ['vampiire', 'dsglovia', 'jessec'];

        let response = checkIn();
        response.attachments = [val.menu('Select a partner', 'userSelect', 'partner', valueObject, menuItems)];

        return response;
    };

    taskSelect = valueObject => {

        const menuItems = ['code wars', 'tutorial', 'other'];

        let response = checkIn();
        response.attachments = [val.menu('Select a task', 'taskSelect', 'task', valueObject, menuItems)];

        return response;
    };

    submitCheckin = valueObject => {

        const message = JSON.parse(valueObject);

        let response = checkIn();
        response.attachments = [val.button(`Check into: ${message.type} session with ${message.partner} to work on ${message.task}`,
                                'checkInSubmit', 'Check In', 'submit', true, valueObject)];
        return response;

    };

module.exports = {
    submit : submit,
    activitySelect : activitySelect,
    userSelect : userSelect,
    taskSelect : taskSelect,
    submitCheckin : submitCheckin
};
