const express = require('express');
const router = module.exports = express.Router();

const val = require('./Slack/tools/valStringer');


router.post('/', (req, res) => {

    const body = req.body;
    const text = body.text;
    
    const response = {
        response_type: 'in_channel',
        text: 'ValStringer Example',
        attachments: []
    }

    switch(text){
        case 'menu':
            // menu stuff
            res.json(valMenuExample({}));
            break;
        case 'button':
            // button stuff
            break;
    }

});

valMenuExample = valueObject => {
    return {
        response_type: 'in_channel',
        text: 'ValStringer Example',
        attachments: [
            {
                text: 'First Menu Input',
                callback_id: 'valMenuItem1',
                actions: [{
                    name: 'Select the first item',
                    type: 'select',
                    data_source: 'static',
                    options: val.options(['1st option', '2nd option', 'Nth option'], 'menuItem1', valueObject)
                }]
            },
            {
                text: 'Second Menu Input',
                callback_id: 'valMenuItem2',
                actions: [{
                    name: 'Select the second item',
                    type: 'select',
                    data_source: 'static',
                    options: val.options(['1st option', '2nd option', 'Nth option'], 'menuItem2', valueObject)
                }]
            }
            
        ]
    }
}

function replaceMenu(response, callbackID, valueObject){
    response.attachments.some( (attachment, attachmendIndex, attachments) => {
        if(attachment.callback_id === callbackID){
            attachments[attachmendIndex] = {
                text: `${attachment.text} *${valueObject[attachment.options[0].text]}*`,
                callbackID: `edit ${attachmendIndex}`,
                actions: [{
                    text: 'Edit',
                    name: 'edit',
                    type: 'button',
                    value: val.stringer(valueObject, 'edit', true)
                }]
            }
        }
    })
} 