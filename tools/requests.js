/**
 * Created by Vampiire on 7/24/17.
 */

const request = require('request');

convertUser = (userID) => {

    const oAuthToken = process.env.oAuthToken;

    return new Promise((resolve, reject) => {
        request.post({
            url: `https://slack.com/api/users.info?token=${oAuthToken}&user=${userID}`,
        }, (error, response, body) => {

            if(error) reject(error);


            let data = JSON.parse(body).user.name;
            resolve(data);
        });

    });
};

channelRequest = (channelID) => {

    const oAuthToken = process.env.oAuthToken;

    return new Promise((resolve, reject) => {
        request.post({
            url: `https://slack.com/api/channels.info?token=${oAuthToken}&channel=${channelID}`,
        }, (error, response, body) => {
            if(error) reject(error);
            resolve(JSON.parse(body).channel.members);
        });
    });
};

module.exports = {
    channelRequest : channelRequest,
    convertUser : convertUser
};
