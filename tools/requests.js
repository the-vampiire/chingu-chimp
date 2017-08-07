/**
 * Created by Vampiire on 7/24/17.
 */

const request = require('request');

// OAuth Token from Slack stored in the .env file
const oAuthToken = process.env.oAuthToken;


channelMembers = (channelID) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://slack.com/api/channels.info?token=${oAuthToken}&channel=${channelID}`,
        }, (error, response, body) => {
            if(error) reject(error);
            resolve(JSON.parse(body).channel.members);
        });
    });
};

userData = (type, userID) => {
    return new Promise((resolve, reject) => {

        request.post({url: `https://slack.com/api/users.info?token=${oAuthToken}&user=${userID}`},
            (error, response, body) => {

            let ok = JSON.parse(body).ok;

            if(!ok) reject(ok);

            let user = JSON.parse(body).user;
            let data;

            switch(type){
                case 'pic':
                    data = {
                        size_72 : user.profile.image_72,
                        size_192: user.profile.image_192
                    };
                    break;
                case 'name':
                    data = user.name;
                    break;
            }

            resolve(data);
        });
    });
};

module.exports = {
    channelMembers,
    userData
};
