
activitySelect = (valueObject) => {

    const fields = {
        text: 'testing attacher',
        callback_id: 'activitySelect',
        actions: [{
            name: 'type',
            type: 'select',
            data_source: 'static'
        }]
    };

    const options = ['test 1', 'test 2', 'test 3'];

    return {
        title: "Check In",
        pretext: "Use the following dropdown menus to define and" +
        "check into your activity.",

        attachments: [val.attachment(valueObject, fields, options)]
    };
};