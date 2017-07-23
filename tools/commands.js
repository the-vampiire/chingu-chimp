/**
 * Created by Vampiire on 7/6/17.
 *
 * all data commands
 *
 *
 * interactive message payload structure
 *  field name: payload.actions[0].name
 *  field value: payload.actions[0].selected_options[0].value
 *
 *
 */

const request = require('request');

convertUser = (userID) => {
    const oAuthToken = process.env.oAuthToken;

    let userName;

    request.post({
        url: `https://slack.com/api/users.info?token=${oAuthToken}&user=${userID}`,
    }, (error, response, body) => {
        if(error) throw error;
        userName = JSON.parse(body).user.name;
    });

    return userName;
};

channelRequest = (channelID) => {

    const oAuthToken = process.env.oAuthToken;

    return new Promise((resolve, reject) => {
        request.post({
            url: `https://slack.com/api/channels.info?token=${oAuthToken}&channel=${channelID}`,
        }, (error, response, body) => {

            if(error) reject(error);

            let data = JSON.parse(body).channel.members;
            resolve(data);
        });

    });

};

interaction = type => {
    let response;

    switch(type){
        case 'checkin':
            response = {
                title: "Check In",
                pretext: "Use the following dropdown menus to define and" +
                "check into your activity.",

                attachments: [{
                    text: "Select an activity:",
                    callback_id: "checkin",
                    attachment_type: "default",
                    actions: [{

                        name: "type",
                        type: "select",
                        options: [
                            {
                                text: "Accountability Buddy check in",
                                value: "accountability",
                            },
                            {
                                text: "Pair Programming check in",
                                value: "pair",
                            },
                            {
                                text: "Team Meeting check in",
                                value: "team",
                            },
                        ]

                    }]
                }]
            };
            break;
    }

    return response;
};

processInteraction = payload => {
    let type = payload.callback_id;
    let name = payload.actions[0].name;
    let value = payload.actions[0].selected_options[0].value;

    let response = interaction(type);
    let attachment;

    switch(type){
        case 'checkin':
            // console.log('process checkin');
            switch(true){
                case value === 'accountability' || value === 'pair':

                   let members;

                   channelRequest(payload.channel.id).then( data => {
                       // members = data.filter(e => e !== payload.user.id ).map( e => convertUser(e));
                       console.log(`channel request: ${data}`);
                   }).catch( e => console.log(`error message ${e}`));

                   // console.log(members);

                    // attachment = {
                    //     text: "Pick a user:",
                    //     callback_id: "checkin",
                    //     attachment_type: "default",
                    //     actions: [{
                    //
                    //         name: "partner",
                    //         type: "select",
                    //         options: [
                    //             {
                    //                 text: "Vampiire",
                    //                 value: "vampiire",
                    //             },
                    //             {
                    //                 text: "JesseC",
                    //                 value: "JesseC",
                    //             }
                    //         ]
                    //
                    //     }]
                    // }
            }


    }

    response.attachments.push(attachment);

    return response;
};

checkIn = document => {

    if(!document){
        // respond with link to signup form
            // if profile doesnt exist
    }

    let attachment;



};

buildProfile = data => {

};


module.exports = {
    interaction: interaction,
    buildProfile: buildProfile,
    process: processInteraction
};