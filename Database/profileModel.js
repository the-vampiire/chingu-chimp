/**
 * Created by Vampiire on 7/3/17.
 *
 */

const mongoose = require('mongoose');
const requests = require('../Slack/tools/requests');

// sub-schemas
const sessionSchema = new mongoose.Schema({
    kind: String,
    task: String,
    partners: [String],
    date: {type: Number, default: Date.now()}
});

const checkinSchema = new mongoose.Schema({
    channelID : String,
    sessions: [sessionSchema]
});

const checkinModel = mongoose.model('checkinModel', checkinSchema);

// main user profile schema
const userSchema = new mongoose.Schema({

    userName: {type: String, lowercase: true},

    profilePic : {
        size_72 : String,
        size_192 : String,
        size_512 : String,
        size_original : String,
        lastUpdate: {type: Number, default: Date.now()}
    },

    portfolio: {type: String, default: null},
    gitHub: {type: String, default: null},
    blog: {type: String, default: null},

    story: String,

    joinDate: {type: Number, default: Date.now()},

    cohorts: [{
        cohortName: String,
        teamID: String,
        userID: String,
        startDate: {type: Number, default: Date.now()},
    }],

    skills: {

        languages: [{
            name: String,
            level: String
        }],

        frameworks: [{
            name: String,
            level: String
        }],

        technologies: [{
            name: String,
            level: String
        }]
    },

    checkins: [checkinSchema],

    projects: [{
        name: String,
        url: {type: String, default: null},
        gitHub: String,
        completedDate: {type: Number, default: Date.now()}
    }],

    certifications: [{
        name: String,
        url: String,
        date: {type: Number, default: Date.now()}
    }],

// profile card data
    points: {type: Number, default: 1},
    bestStreak: {type: Number, default: 0},
    currentStreak: {
        value: {type: Number, default: 0},
        lastUpdate: {type: Number, default: Date.now()}
    },
    lastCheckin: sessionSchema,
    totalCheckins: {type: Number, default: 0},
    badges : [{
        badgeType : String,
        name : String,
        url : String,
        color : {type: String, default: null}
    }],

}, { runSettersOnQuery : true });

// Load the profile methods
const User = require('./profileMethods');
userSchema.loadClass(User);

const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema,
    userProfile,
    checkinSchema,
    checkinModel
};




