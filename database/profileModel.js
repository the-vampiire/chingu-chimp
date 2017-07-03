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

    cohort: [{
        cohortName: String,
        startDate: {type: Number, default: Date.now()},
    }],

    checkin: {

        pair: [{
            partner: String,
            date: {type: Number, default: Date.now()},
            task: String
        }],

        accountability: [{
            partner: String,
            date: {type: Number, default: Date.now()},
            task: String
        }],

        team: [{
            partners: [{
                username: String
            }],
            date: {type: Number, default: Date.now()},
            project: String
        }]

    },






});

