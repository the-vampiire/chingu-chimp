/**
 * Created by Vampiire on 7/3/17.
 *
 */


const mongoose = require('mongoose');
const requests = require('../tools/requests');

    const sessionSchema = new mongoose.Schema({
        kind: String,
        task: String,
        partners: [String],
        date: {type: Number, default: Date.now()}
    });

    const checkinSchema = new mongoose.Schema({

    // uncomment to separate session streaks by channel
        // currentStreak: {type: Number, default: 0},
        // bestStreak: {type: Number, default: 0}
            // dont forget to update the global profile streaks or comment them out

        channelID : String,

        sessions: [sessionSchema]

    });

    const checkinModel = mongoose.model('checkinModel', checkinSchema);

    const userSchema = new mongoose.Schema({

        userName: {type: String, lowercase: true},

        profilePic : {
            size_72 : {type: String, default: null},
            size_192 : {type: String, default: null}
        },

        portfolio: {type: String, default: null},
        gitHub: {type: String, default: null},
        blog: {type: String, default: null},

        story: String,

        joinDate: {type: Number, default: Date.now()},

    // automatically add new cohorts to returning users' profiles
        cohorts: [{
            cohortName: String,
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
            }]
        },

        checkins: [checkinSchema],
        lastCheckin: sessionSchema,
        totalCheckins: {type: Number, default: 0},

        projects: [{
            name: String,
            url: {type: String, default: null},
            gitHub: {type: String, default: null},
            completedDate: {type: Number, default: Date.now()}
        }],

        certifications: [{
            name: String,
            url: {type: String, default: null},
            date: {type: Number, default: Date.now()}
        }],

        points: {type: Number, default: 1},
        bestStreak: {type: Number, default: 0},
        currentStreak: {
            value: {type: Number, default: 0},
            lastUpdate: {type: Number, default: Date.now()}
        },



    }, { runSettersOnQuery : true });

// ----------------- PROFILE MODEL METHODS ---------------- //
        // ----- embedded database methods ----- //

    userSchema.statics.addProfile = function(formData){
        this.create(formData, e => e ? console.log(e) : false);
    };

    userSchema.statics.getProfile = function(userName){
        return this.findOne({userName : userName});
    };

    userSchema.statics.getProfileItem = function(userName, item){
        return this.findOne({userName : userName}, item);
    };

// ----------------- CUSTOM METHODS ----------------- //

// ------- CHECKIN PROCESSING ------- //
userSchema.statics.processCheckin = function(userName, cohortName, channelID, checkinSessionData){

    return new Promise( (resolve, reject) => {
        this.findOne({userName: userName}).then( profileDoc => {
            if(profileDoc){

                let cohorts = profileDoc.cohorts;
                profileDoc.cohorts = checkAndAddCohort(cohorts, cohortName);

                const checkins = profileDoc.checkins;
                let channel = checkins.find( e => e.channelID === channelID);

                channel ?
                    channel.sessions.push(checkinSessionData) :
                    checkins.push(new checkinModel({channelID : channelID, sessions : [checkinSessionData]}));

                const streakUpdate = streakUpdater(checkins, profileDoc.currentStreak, profileDoc.bestStreak);
                let currentStreak = streakUpdate.currentStreak;
                let bestStreak = streakUpdate.bestStreak;


                profileDoc.lastCheckin = checkinSessionData;
                profileDoc.totalCheckins++;

                profileDoc.save( (saveError, success) => {

                    if(saveError) resolve(saveError);
                    if(success){
                       if(channel) resolve(`succesfully saved the checkin for \`@${userName}\`. you have \`${channel.sessions.length}\` checkins on this channel!
             \`current streak\`: ${currentStreak.value} || \`best streak\`: ${bestStreak}\n`);
                       else resolve(`succesfully saved the checkin for \`@${userName}\`. This is your first checkin on this channel, keep it up!
             \`current streak\`: ${currentStreak.value} || \`best streak\`: ${bestStreak}\n`);
                    }
                });
            }

            else resolve(`Checkin for \`@${userName}\` failed:\nprofile \`@${userName}\` not found\nplease share this link ENTER FORM WEBSITE HERE to with ${userName} to create a profile\n`);
        });
    });
};

streakUpdater = (checkins, currentStreak, bestStreak) => {

    let currentDate = Number(Date.now());

    if(currentDate - currentStreak.lastUpdate >= 86400000){

        let resetStreak = !checkins.some( checkin => {
            let sessionsArray = checkin.sessions, lastDate = sessionsArray[sessionsArray.length - 1].date;

            if (currentDate - lastDate <= 86400000) {
                currentStreak.value++;
                if (bestStreak < currentStreak) bestStreak = currentStreak;
                return true;
            }
        });

        if(resetStreak) currentStreak = 0;

        currentStreak.lastUpdate = currentDate;
    }

    return {currentStreak, bestStreak};
};


// ------- UPDATE PROCESSING ------- //
    userSchema.statics.processUpdate = function(userName, cohortName, data){

        return this.findOne({userName: userName}).then( profileDoc => {

            if(profileDoc){

                // if the cohort the user is updating from is not in their profile then it is added in this step
                let cohorts = profileDoc.cohorts;
                profileDoc.cohorts = checkAndAddCohort(cohorts, cohortName);

                let updateItem = data.item;
                let updateData = data.updateData;

                switch(updateItem){

                    // pushing updateData into a profile item array
                    case 'certifications':
                    case 'projects':
                        profileDoc[updateItem].push(updateData);
                        break;

                    // pushing updateData into a nested profile item array
                    case 'skills':
                        let subUpdateItem = data.subItem;
                        profileDoc[updateItem][subUpdateItem].push(updateData);
                        break;

                    // setting the url field
                    case 'blog':
                    case 'gitHub':
                    case 'portfolio':
                        profileDoc[updateItem] = updateData.url;
                        break;

                    // simple string/number/object
                    case 'profilePic':
                    case 'story':
                        profileDoc[updateItem] = updateData;
                        break;
                }

                return profileDoc.save( (saveError, doc) => saveError ? saveError : false)
            }

            else{
                // alert the AutoBot to message the user who does not have an account. pass on the link to set up their profile
                return `Update for \`@${userName}\` failed:\nprofile \`@${userName}\` not found. Please visit ENTER FORM WEBSITE HERE to create a profile`;
            }

        }).then( responseData => {

            if(typeof responseData === 'string') return responseData;

            return `Successfully updated the \`${data.item}\` profile item for \`${userName}\``

        });
    };


// --------------- HELPERS ----------------- //

checkAndAddCohort = (cohorts, cohortName) => {

// cohortName comes in in the form [cohort-name-style] and must be processed to [Cohort Name Style] for comparison
    cohortName = cohortName.slice(cohortName.lastIndexOf('/')+1)
        .split('-')
        .map(word => word = `${word.slice(0,1).toUpperCase()}${word.slice(1)}`)
        .join(' ');

// if the passed match is not found in the array of then add it
    if(!cohorts.some( e => e.cohortName === cohortName)){
       cohorts.push({cohortName: cohortName});
    }

   return cohorts;
};

    const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema : userSchema,
    userProfile : userProfile,
    checkinSchema : checkinSchema,
    checkinModel : checkinModel
};