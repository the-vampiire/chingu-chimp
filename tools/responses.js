/**
 * Created by Vampiire on 7/24/17.
 */

const valStringer = require('./valueStringer');

activitySelect = (valueObject) => {
    return {
        title: "Check In",
        pretext: "Use the following dropdown menus to define and" +
        "check into your activity.",

        attachments: [{
            text: "Select an activity:",
            callback_id: "activitySelect",
            attachment_type: "default",
            actions: [{

                name: "type",
                type: "select",
                data_source: 'static',
                options: [
                    {
                        text: "Accountability Buddy check in",
                        value: valStringer(valueObject, 'type', 'accountability'),
                    },
                    {
                        text: "Pair Programming check in",
                        value: valStringer(valueObject, 'type', 'pair'),
                    },
                    {
                        text: "Team Meeting check in",
                        value: valStringer(valueObject, 'type', 'team'),
                    }
                ],
            }]
        }]
    };
};

userSelect = (valueObject) => {
    return {
        title: "Check In",
            pretext: "Use the following dropdown menus to define and check into your activity.",

        attachments: [{
        text: "Select a partner:",
        callback_id: "userSelect",
        attachment_type: "default",
        actions: [{

            name: "type",
            type: "select",
            data_source: 'static',
            options: [
                {
                    text: "Accountability Buddy check in",
                    value: valStringer(valueObject, 'partner', 'accountability'),
                },
                {
                    text: "Pair Programming check in",
                    value: valStringer(valueObject, 'partner', 'pair'),
                },
                {
                    text: "Team Meeting check in",
                    value: valStringer(valueObject, 'partner', 'team'),
                }
            ],
        }]
    }]
    };
};

taskSelect = (valueObject, tasksArray = null) => {

    tasksArray ? tasks = tasksArray : tasks = ['code wars', 'tutorial', 'other'];

    return {
        title: "Check In",
        pretext: "Use the following dropdown menus to define and check into your activity.",

        attachments: [{
            text: "Select a task:",
            callback_id: "taskSelect",
            attachment_type: "default",
            actions: [{
                name: "task",
                type: "select",
                data_source: 'static',
                options : populateOptions(tasks, 'task', valueObject)
            }]
        }]
    };
};

populateOptions = (dataArray, key, valueObject) => {
    let options = [];

    dataArray.forEach( e => {

        let textValuePair = {};
        textValuePair.text = e;
        textValuePair.value = valStringer(valueObject, key, e);

        options.push(textValuePair);
    });

    return options;
};




module.exports = {
    activitySelect : activitySelect,
    userSelect : userSelect,
    taskSelect : taskSelect
};
