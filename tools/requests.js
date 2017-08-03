/**
 * Created by Vampiire on 7/24/17.
 */

const request = require('request');

// OAuth Token from Slack stored in the .env file
const oAuthToken = process.env.oAuthToken;

convertID = (userID) => {
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
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://slack.com/api/channels.info?token=${oAuthToken}&channel=${channelID}`,
        }, (error, response, body) => {
            if(error) reject(error);
            resolve(JSON.parse(body).channel.members);
        });
    });
};

injectPartners = (payload, valueObject) => {

    return requests.channel(payload.channel.id).then( IDs => {
        let promises = [];
        IDs.forEach( ID => promises.push(requests.convertID(ID)));
        return Promise.all(promises);
    }).then( partners => {
        valueObject.partners = partners.filter( partner => partner !== 'chance');
        valueObject.partners.forEach( partner => {

        });
        // database update function
        // search for user
        // pass value object
        return valueObject;
    });
};

module.exports = {
    channel : channelRequest,
    convertID : convertID,
};
