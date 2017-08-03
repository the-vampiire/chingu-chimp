/**
 * Created by Vampiire on 7/3/17.
 *
 */


const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({

    channelID : String,

    sessions: [{
        kind: String,
        task: String,
        partners: [String],
        date: {type: Number, default: Date.now()}
    }]
});

const checkinModel = mongoose.model('checkinModel', checkinSchema);

const userSchema = new mongoose.Schema({

    userName: {type: String, lowercase: true},
    teamID: String,

    portfolioURL: {type: String, default: null},
    gitHubURL: {type: String, default: null},
    blogURL: {type: String, default: null},

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

    checkins: [checkinSchema],

    projects: [{
        name: String,
        url: {type: String, default: null},
        gitHubURL: {type: String, default: null},
        completedDate: {type: Number, default: Date.now()}
    }],

    certifications: [{
        name: String,
        url: {type: String, default: null},
        date: {type: Number, default: Date.now()}
    }],

    points: {type: Number, default: 1},
    currentStreak: {type: Number, default: 0},
    bestStreak: {type: Number, default: 0}

}, { runSettersOnQuery : true});

// ----------------- PROFILE MODEL METHODS ---------------- //
        // ----- embedded database methods ----- //

userSchema.statics.addProfile = function(formData){
    this.create(formData, e => e ? console.log(e) : false);
};

userSchema.statics.getProfile = function(userName){
    return this.findOne({userName : userName});
};

userSchema.statics.getItem = function(userName, item){
    return this.findOne({userName : userName}, `${item} -_id`);
};

userSchema.statics.checkin = function(userName, channelID, valueObject){
    this.findOne({userName:userName}).then( doc => {
        const checkins = doc.checkins;
        let channel = checkins.find( e => e.channelID === channelID);

        channel ? channel.sessions.push(valueObject) :
            checkins.push(new checkinModel({channelID : channelID, sessions : [valueObject]}));

    // update current and best streak fields
        checkins.some( checkin => {
            let lastDate = checkin.sessions[checkin.sessions.length-1].date;
            let currentDate = Number(Date.now());
            if(currentDate - lastDate <= 86400000){
                doc.currentStreak++;
                doc.bestStreak < doc.currentStreak ? doc.bestStreak = doc.currentStreak : false;
                return true;
            }else{
                doc.currentStreak = 0;
            }
        });

        doc.save( e => console.log(e));

    }, e => console.log(e));
};

const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema : userSchema,
    userProfile : userProfile,
    checkinSchema : checkinSchema,
    checkinModel : checkinModel
};

