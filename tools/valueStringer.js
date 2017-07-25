
valStringer = (valueObject, key, value) => {

// on the first call of valStringer the valueObject is an object. However on subsequent calls
// it will be returned in the payload as a string and must be converted before being processed;
    if(typeof valueObject === 'string') valueObject = JSON.parse(valueObject);

    valueObject[key] = value;
    return JSON.stringify(valueObject);
};

valOptions = (dataArray, key, valueObject) => {
    let options = [];

    dataArray.forEach( e => {
        let textValuePair = {};
        textValuePair.text = e;
        textValuePair.value = valStringer(valueObject, key, e);

        options.push(textValuePair);
    });

    return options;
};



/**

                        Description / how to use the valAttacher function:

 valueObject:
   initial message: pass an empty object {}
   subsequent responses: pass the value object from the Slack interactive message payload
       accessed via: "payload.actions[0].selected_options[0].value"

 attachmentFields:
   this is an object containing all attachment fields besides the options themselves
   the following is a list of the minimum required fields:
   {
        text: instructional text describing the purpose of the dropdown menu,
        callback_id: the id of the particular message, this is used server side to distinguish the received message,
        actions: [{

            name: pass the same name as the field in the database schema that the value will be associated with,
            type: 'select' DO NOT CHANGE THIS,
            data_source: 'static' DO NOT CHANGE THIS,
        }],

        any additional slack-accepted fields you would like should be added [comma-separated] below
    }
************************************************

    for copy and pasting - the minimum:

    {
        text: replaceMe,
        callback_id: replaceMe,
        actions: [{
            name: replaceMe,
            type: 'select',
            data_source: 'static'
        }]
    }

************************************************

 optionsTextArray:
   this is an array that will provide text labels for each value
   it can be hardcoded into the Default variable or passed into the function


 **/

valAttacher = (valueObject, attachmentFields, optionsTextArray = null) => {

    const minimum = ['text', 'callback_id', 'actions', 'actions[0].'];
    const actionsMinimum = [{key: 'type', value: 'select'}];

    try {

    } catch(e){

    }




// tests the attachmentFields object to ensure that all minimum field requirements have been met;
    // could split this into a switch or chained if to give better feedback on which property is missing
    if(!(attachmentFields.hasOwnProperty('text')
        && attachmentFields.hasOwnProperty('callback_id')
        && attachmentFields.hasOwnProperty('actions'))){
        return 'minimum required fields missing';
    }else{
        const actions = attachmentFields.actions[0];
        if(!(actions.hasOwnProperty('name') && actions.type === 'select' && actions.data_source === 'static')){
            return 'minimum required fields for the action object missing'
        }
    }



// handle attachment fields
    let attachment = {};
    let keys = Object.keys(attachmentFields);
    keys.forEach( key => attachment[key] = attachmentFields[key] );

// handle "select" options
    // Default is used in the case of an external source array failing
    let Default = [ / hardcode a default array of text strings here / ];

    let textArray;
    optionsTextArray ? textArray = optionsTextArray : textArray = Default;

    attachment.options = populateOptions(textArray, attachmentFields.name, valueObject);
    return attachment;
};

module.exports = {
    stringer : valStringer,
    options : valOptions,
    attachment : valAttacher
};
