/**
 * Created by Vampiire on 7/3/17.
 *
 * stores all of the tracked metrics
 *
 *
 * cohort array will hold all cohorts user has been a part of
 *      new cohorts are pushed to the end
 *      current display cohort is last in list (latest cohort)
 *
 *
 *
 */


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName: String,
    teamID: String,

    portfolioURL: {type: String, default: false},
    gitHubURL: {type: String, default: false},
    blogURL: {type: String, default: false},

    story: String,

    joinDate: Number,

    cohort: [{
        cohortName: String,
        startDate: {type: Number, default: Date.now()},
    }],

    aptitudes: {

        languages: [{
            name: String,
            level: String
        }],

        frameworks: [{
            name: String,
            level: String
        }]
    },

    checkin: {

        channel: [{

            ID: String,

            log: [{
                type: String,
                partners: [String],
                task: String
                date: {type: Number, default: Date.now()}
            }],

            currentStreak: {type: Number, default: 0},
            bestStreak: {type: Number, default: 0}
        }],
    },

    projects: [{
        name: String,
        url: {type: String, default: null},
        gitHubURL: {type: String, default: null},
        completedDate: {type: Number, default: Date.now()}
    }],

    certifications: [{
        name: String,
        url: {type: String, default: false},
        date: {type: Number, default: Date.now()}
    }]

});

const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema : userSchema,
    userProfile : userProfile
};

