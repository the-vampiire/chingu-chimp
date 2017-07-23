/**
 * Created by Vampiire on 7/6/17.
 *
 * all data commands
 *
 */


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
    buildProfile: buildProfile
};