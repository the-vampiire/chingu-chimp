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
 */


const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: String,
    joinDate: Number,
    story: String,

    cohort: [{
        cohortName: String,
        startDate: {type: Number, default: Date.now()},
    }],

    completed: [{
        project: String,
        url: {type: String, default: false},
        date: Number
    }],

    current: [{
        project: String,
        url: {type: String, default: false},
        date: Number
    }],

    certifications: [{
        name: String,
        url: {type: String, default: false},
        date: Number
    }],

    checkin: {

        pair: [{
            partner: String,
            date: {type: Number, default: Date.now()},
            task: String,
            streak: Number
        }],

        accountability: [{
            partner: String,
            date: {type: Number, default: Date.now()},
            task: String,
            streak: Number
        }],

        team: [{
            partners: [{
                username: String
            }],
            date: {type: Number, default: Date.now()},
            project: String,
            streak: Number
        }]

    },

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

    sharable: {type: Boolean, default: true}

});

