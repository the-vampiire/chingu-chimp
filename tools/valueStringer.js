// ---------------------------- CORE EXPORTS --------------------------------- //

// builds or extends and returns the value object
valStringer = (valueObject, key, value) => {

    if(typeof valueObject === 'string') valueObject = JSON.parse(valueObject);

    valueObject[key] = value;
    return JSON.stringify(valueObject);
};

// builds and returns the options array for message menus
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


// builds and returns an attachment object

valMenu = (headerText, callbackID, menuName, valueObject, menuItemsArray, customAttachment) => {

    let attachment = customAttachment ? errorScan('menu', customAttachment) ? errorScan('menu', customAttachment) :
        customAttachment :
        menuAttachment(headerText, callbackID, menuName);

    if(typeof attachment === "object"){
        let actions = attachment.actions[0];
        actions.options = valOptions(menuItemsArray, actions.name, valueObject);
    }

    return attachment;
};

valButton = (headerText, callbackID, buttonText, buttonName, buttonValue, valueObject, customAttachment) => {

    let attachment = customAttachment ? errorScan('button', customAttachment) ? errorScan('button', customAttachment) :
        customAttachment :
        buttonAttachment(headerText, callbackID, buttonText, buttonName, buttonValue, valueObject);

    if(typeof attachment === "object")
        customAttachment.actions[0].value = valStringer(valueObject, buttonName, buttonValue);

    return attachment;
};

valMessage = valObject => {

};

// ---------------------------- TOOLS --------------------------------- //

// builds the shell of a menu attachment
menuAttachment = (headerText, callbackID, menuName) => {

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
buttonAttachment = (headerText, callbackID, buttonText, buttonName, buttonValue, valueObject) => {

    return {
        text: headerText,
        callback_id: callbackID,
        actions: [{
            text: buttonText,
            name: buttonName,
            type: 'button',
            value: valStringer(valueObject, buttonName, buttonValue)
        }]
    }
};

// scans a custom attachment object for errors
errorScan = (type, customAttachment) => {

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
verifyKeys = (object, expectedKeys, location) => {
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
    menu : valMenu,
    button : valButton
};