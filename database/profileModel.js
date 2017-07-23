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
    joinDate: Number,
    story: String,

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
                partner: String,
                date: {type: Number, default: Date.now()},
                task: String,
                streak: Number
            }],

            streak: Number,
        }],
    },

    current: [{
        project: String,
        url: {type: String, default: false},
        date: {type: Number, default: Date.now()}
    }],

    completed: [{
        project: String,
        url: {type: String, default: false},
        date: Number
    }],

    certifications: [{
        name: String,
        url: {type: String, default: false},
        date: Number
    }]

});

const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema : userSchema,
    userProfile : userProfile
};

