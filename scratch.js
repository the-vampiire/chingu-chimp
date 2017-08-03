// /**
//  * Created by Vampiire on 7/3/17.
//  *
//  * stores all of the tracked metrics
//  *
//  *
//  * cohort array will hold all cohorts user has been a part of
//  *      new cohorts are pushed to the end
//  *      current display cohort is last in list (latest cohort)
//  *
//  *
//  *
//  */
//
//
// const mongoose = require('mongoose');
//
// const checkinSchema = new mongoose.Schema({
//     channelID : String,
//
//     log: [{
//         channelID: String,
//         type: String,
//         partners: [String],
//         task: String,
//         date: {type: Number, default: Date.now()}
//     }]
// });
//
// const userSchema = new mongoose.Schema({
//
//     userName: String,
//     teamID: String,
//
//     portfolioURL: {type: String, default: null},
//     gitHubURL: {type: String, default: null},
//     blogURL: {type: String, default: null},
//
//     story: String,
//
//     joinDate: Number,
//
//     cohort: [{
//         cohortName: String,
//         startDate: {type: Number, default: Date.now()},
//     }],
//
//     aptitudes: {
//
//         languages: [{
//             name: String,
//             level: String
//         }],
//
//         frameworks: [{
//             name: String,
//             level: String
//         }]
//     },
//
//     checkins: [{type: checkinSchema, default: null}],
//
//     projects: [{
//         name: String,
//         url: {type: String, default: null},
//         gitHubURL: {type: String, default: null},
//         completedDate: {type: Number, default: Date.now()}
//     }],
//
//     certifications: [{
//         name: String,
//         url: {type: String, default: null},
//         date: {type: Number, default: Date.now()}
//     }],
//
//     points: {type: Number, default: 1},
//     currentStreak: {type: Number, default: 0},
//     bestStreak: {type: Number, default: 0}
//
// });
//
// const userProfile = mongoose.model('userProfile', userSchema);
//
// module.exports = {
//     userSchema : userSchema,
//     userProfile : userProfile
// };
//


let arr = [];

console.log(Array.isArray(arr));
