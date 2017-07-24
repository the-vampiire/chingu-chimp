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
                        value: valStringer(valueObject, 'value', 'accountability'),
                    },
                    {
                        text: "Pair Programming check in",
                        value: valStringer(valueObject, 'value', 'pair'),
                    },
                    {
                        text: "Team Meeting check in",
                        value: valStringer(valueObject, 'value', 'team'),
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
                    value: valStringer(valueObject, 'val1', 'accountability'),
                },
                {
                    text: "Pair Programming check in",
                    value: valStringer(valueObject, 'val1', 'pair'),
                },
                {
                    text: "Team Meeting check in",
                    value: valStringer(valueObject, 'val1', 'team'),
                }
            ],
        }]
    }]
    };
};

taskSelect = (valueObject) => {
    return {
        title: "Check In",
        pretext: "Use the following dropdown menus to define and check into your activity.",

        attachments: [{
            text: "Select a task:",
            callback_id: "taskSelect",
            attachment_type: "default",
            actions: [{

                name: "type",
                type: "select",
                data_source: 'static',
                options: [
                    {
                        text: "code wars",
                        value: valStringer(valueObject, 'val2', 'code wars'),
                    },
                    {
                        text: "tutorial",
                        value: valStringer(valueObject, 'val2', 'tutorial'),
                    },
                    {
                        text: "other",
                        value: valStringer(valueObject, 'val2', 'other'),
                    }
                ],
            }]
        }]
    };
};



module.exports = {
    activitySelect : activitySelect,
    userSelect : userSelect,
    taskSelect : taskSelect
};
