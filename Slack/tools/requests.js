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

userPicture = userID => {
    return new Promise((resolve, reject) => {

        request.post({url: `https://slack.com/api/users.profile.get?token=${oAuthToken}&user=${userID}`},
            (error, response, body) => {

            let ok = JSON.parse(body).ok;

            if(!ok) reject(ok);

            let profile = JSON.parse(body).profile
            let data = {
                size_72 : profile.image_72,
                size_192: profile.image_192,
                size_512: profile.image_512,
                size_original: profile.image_original
            };
        
            resolve(data);
        });
    });
};

// userProfile = (type, userID) => {
//     return new Promise((resolve, reject) => {

//         request.post({url: `https://slack.com/api/users.profile.get?token=${oAuthToken}&user=${userID}`},
//             (error, response, body) => {

//             let ok = JSON.parse(body).ok;

//             if(!ok) reject(ok);

//             let user = JSON.parse(body).user;
//             let data;

//             switch(type){
//                 case 'pic':
//                     data = {
//                         size_72 : user.profile.image_72,
//                         size_192: user.profile.image_192,
//                         size_512: user.profile.image_512
//                     };
//                     break;
//                 case 'name':
//                     data = user.name;
//                     break;
//             }

//             resolve(data);
//         });
//     });
// };

module.exports = {
    channelMembers,
    userPicture
};
