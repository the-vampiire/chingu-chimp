/*
*
* notes from the original valueStringer function
* this function allows the value of each interactive message menu item to hold an object storing current and previous values
* obtained via user interaction
 the function accepts the value object, a key parameter [the item the user sees], and a value associated with that key
 when the final value is received you can process the value object and store all of its data in the database in bulk rather
 than doing it piecewise as each value is received at your interactive message request route

 this removes n-1 database queries per user interaction
 if you design the value object's key/value pairs to align with your database schema it greatly simplifies the process
 of gathering and storing data from slack
*


Testing an alternate approach where a complete "form" is displayed and 
as each option is selected it is replaced with the selection
when all items have been selected then a confirm button is returned on the form

const val = require('./valStringer');
// valstringer test
function replaceMenu(response, callbackID, valueObject){
    console.log(response.attachments[0].actions);
    response.attachments.some( (attachment, attachmendIndex, attachments) => {
        if(attachment.callback_id === callbackID){
            // console.log(JSON.stringify(valueObject));
            attachments[attachmendIndex] = {
                text: `${attachment.text} *${attachment.actions[0].options[0].text}*`,
                mrkdwn_in: ['text', 'pretext'],
                callbackID: `edit ${attachmendIndex}`,
                actions: [{
                    text: 'Edit',
                    name: 'edit',
                    type: 'button',
                    value: val.stringer(valueObject, 'edit', true)
                }]
            }
            // console.log(attachments[attachmendIndex]);
        }
    })

    return response;
}
*
* */


// ---------------------------- CORE EXPORTS --------------------------------- //

// builds and returns the valueObject
function valStringer(valueObject, key, value) {
    
    if(typeof valueObject === 'string') valueObject = JSON.parse(valueObject);

    valueObject[key] = value;

    return JSON.stringify(valueObject);
};

// integrates valStringer and returns the options array for message menus
function valOptions(dataArray, key, valueObject) {
    let options = [];

    dataArray.forEach( e => {
        let textValuePair = {};
        textValuePair.text = e;
        textValuePair.value = valStringer(valueObject, key, e);

        options.push(textValuePair);
    });

    return options;
};

// modifies and returns a /custom attachment/ to include valStringer support
function valCustom(type, customAttachment, valueObject, menuItemsArray) {

    const errorScan = errorScan(type, customAttachment);
    if(errorScan) return errorScan;

    switch(type){
        case 'menu':
            return valMenu(customAttachment, valueObject, menuItemsArray);
        case 'button':
            return valButton(customAttachment, valueObject);
    }
};

// builds and returns a menu /attachment/ with integrated valStringer support
function valMenu(customAttachment, valueObject, menuItemsArray, headerText, callbackID, menuName) {

    let attachment = customAttachment ? errorScan('menu', customAttachment) ? errorScan('menu', customAttachment) :
        customAttachment :
        menuAttachment(headerText, callbackID, menuName);

    if(typeof attachment === "object"){
        let actions = attachment.actions[0];
        actions.options = valOptions(menuItemsArray, actions.name, valueObject);
    }

    return attachment;
};

// builds and returns a button /attachment/ with integrated valStringer support
function valButton(customAttachment, valueObject, headerText, callbackID, buttonText, buttonName, buttonValue) {

    let attachment = customAttachment ? errorScan('button', customAttachment) ? errorScan('button', customAttachment) :
        customAttachment :
        buttonAttachment(headerText, callbackID, buttonText, buttonName, buttonValue, valueObject);

    if(typeof attachment === "object")
        attachment.actions[0].value = valStringer(valueObject, buttonName, buttonValue);

    return attachment;
};

// builds and returns a submit / reset / cancel multiple-button message 
// with integrated valStringer support
function valSubmit(valueObject, type, reset, cancel, customText) {

    let response = {
        text: `${customText ? customText : 'Confirm, Cancel or Start Over'}`,

        attachments: [
            {
                text: '',
                callback_id: `${type}Submit`,
                actions: [{
                    text: 'Confirm',
                    name: 'submit',
                    type: 'button',
                    style: 'primary',
                    value: valStringer(valueObject, 'submit', true)
                }]
            }
        ]
    };

    if(reset) response.attachments[0].actions.push({
            text: 'Start Over',
            name: 'submit',
            type: 'button',
            value: valStringer(valueObject, 'submit', false)
        }
    );

    if(cancel) response.attachments[0].actions.push({
        text: 'Cancel',
        name: 'submit',
        type: 'button',
        style: 'danger',
        value: valStringer(valueObject, 'submit', 'cancel')
    });

    return response;
};

// ---------------------------- TOOLS --------------------------------- //

// builds the shell of a menu attachment
function menuAttachment(headerText, callbackID, menuName) {

    return {
        text: headerText,
        callback_id: callbackID,
        actions: [{
            name: menuName,
            type: 'select',
            data_source: 'static'
        }]
    }

};

// builds the shell of a button attachment
function buttonAttachment(headerText, callbackID, buttonText, buttonName, buttonValue, valueObject) {

    return {
        text: headerText,
        callback_id: callbackID,
        actions: [{
            text: buttonText,
            name: buttonName,
            type: 'button'
        }]
    }
};


// scans a custom attachment object for errors
function errorScan(type, customAttachment) {

    const expectedKeys = ['text', 'callback_id', 'actions'];
    const expectedSubKeys = type === 'menu' ? ['name', 'type', 'data_source'] : ['text', 'name', 'type'];

    const keysError = verifyKeys(customAttachment, expectedKeys, 'outer attachment properties');
    if(keysError){
        return keysError;
    }

    const actions = customAttachment.actions[0];
    const subKeysError = verifyKeys(actions, expectedSubKeys, 'actions array object');
    if(subKeysError){
        return subKeysError;
    }

    else {
        switch(type){
            case 'menu':
                switch(true) {
                    case actions.type !== 'select':
                        return `invalid custom attachment: action type must be "select" for interactive menus`;
                    case actions.data_source !== 'static':
                        return `invalid custom attachment: data_source must be "static" for interactive menus`;
                }
                break;
            case 'button':
                switch(true){
                    case actions.type !== 'button':
                        return `invalid custom attachment: action type must be "button" for interactive buttons`;
                }
                break;
        }
    }

    return false;
};


// verifies the keys of a custom attachment object
function verifyKeys(object, expectedKeys, location) {
    let error;

    expectedKeys.forEach( e => {
        if(!object.hasOwnProperty(e)){
            error = `invalid custom attachment: missing the property "${e}" in the ${location}`;
        }
    });

    return error ? error : false;
};

module.exports = {
    stringer : valStringer,
    options : valOptions,
    button : valButton,
    custom : valCustom,
    menu : valMenu,
    submit : valSubmit,
};



