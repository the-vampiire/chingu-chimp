/**
 * Created by Vampiire on 7/3/17.
 *
 */


const mongoose = require('mongoose');

    const checkinSchema = new mongoose.Schema({

    // uncomment to separate session streaks by channel
        // currentStreak: {type: Number, default: 0},
        // bestStreak: {type: Number, default: 0}
            // dont forget to update the global profile streaks or comment them out

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
            gitHub: {type: String, default: null},
            completedDate: {type: Number, default: Date.now()}
        }],

        certifications: [{
            name: String,
            url: {type: String, default: null},
            date: {type: Number, default: Date.now()}
        }],

        points: {type: Number, default: 1},

    // global profile streaks
        // can be given for helpfulness points, checkins, etc
        currentStreak: {type: Number, default: 0},
        bestStreak: {type: Number, default: 0}

    }, { runSettersOnQuery : true });

// ----------------- PROFILE MODEL METHODS ---------------- //
        // ----- embedded database methods ----- //

    userSchema.statics.addProfile = function(formData){
        this.create(formData, e => e ? console.log(e) : false);
    };

    userSchema.statics.getProfile = function(userName){
        return this.findOne({userName : userName});
    };

    userSchema.statics.getItem = function(userName, item){
        return this.findOne({userName : userName}, item);
    };

// ----------------- CUSTOM METHODS ----------------- //

// ------- CHECKIN PROCESSING ------- //
    userSchema.statics.processCheckin = function(userName, cohortName, channelID, valueObject){

        return this.findOne({userName:userName}).then( profileDoc => {

            let error;
            let currentStreak;
            let bestStreak;

        // if the cohort the user is checking in from is not in their profile then it is added in this step
            let cohorts = profileDoc.cohorts;
            profileDoc.cohorts = injectCohort(cohorts, cohortName);

            const checkins = profileDoc.checkins;
            let channel = checkins.find( e => e.channelID === channelID);

            channel ? channel.sessions.push(valueObject) :
                checkins.push(new checkinModel({channelID : channelID, sessions : [valueObject]}));

        // update current and best streak fields
// ----- URGENT ------ //
    // this logic allows for the streak to be increased for EACH checkin. meaning it is tracking
    // "checkin points" rather than the streak. fix the code to handle the streak and discuss the option of
    // either having checkin points or incrementing user points by some value per checkin
            checkins.some( checkin => {
                let lastDate = checkin.sessions[checkin.sessions.length-1].date;
                let currentDate = Number(Date.now());
                if(currentDate - lastDate <= 86400000){
                    profileDoc.currentStreak++;
                    profileDoc.bestStreak < profileDoc.currentStreak ? profileDoc.bestStreak = profileDoc.currentStreak : false;
                    return true;
                }else{
                    profileDoc.currentStreak = 0;
                }
            });

            currentStreak = profileDoc.currentStreak;
            bestStreak = profileDoc.bestStreak;

            profileDoc.save( saveError => saveError ? error = saveError : null);

            return { error, currentStreak, bestStreak };

        }, profileFindError => profileFindError ? error = profileFindError : null ).then( responseData => {
            console.log(responseData);
            return responseData.error ? `sorry the user ${userName} does not have a profile` : `succesfully saved the checkin for @${userName}. current streak: ${responseData.currentStreak}. best streak: ${responseData.bestStreak}`;
        });

    };

// ------- UPDATE PROCESSING ------- //
    userSchema.statics.processUpdate = function(userName, cohortName, data){
        this.findOne({userName: userName}).then( profileDoc => {

            console.log(cohortName);

        // if the cohort the user is updating from is not in their profile then it is added in this step
            let cohorts = profileDoc.cohorts;
            profileDoc.cohorts = injectCohort(cohorts, cohortName);

            let updateItem = data.item;
            let updateData = data.updateData;

            switch(updateItem){

            // pushing updateData into a profile item array
                case 'certifications':
                case 'projects':
                    // console.log(`profileDoc ${profileDoc[updateItem]}\nupdate item ${updateItem}\n updateData${updateData}`);
                    profileDoc[updateItem].push(updateData);
                    break;
            // pushing updateData into a nested profile item array
                case 'aptitudes':
                    let subUpdateItem = data.subItem;
                    profileDoc[updateItem][subUpdateItem].push(updateData);
                    break;

            // setting the url field
                case 'blog':
                case 'gitHub':
                case 'portfolio':
                    profileDoc[updateItem] = updateData.url;
                    break;

            // simple string/number passing
                case 'story':
                    profileDoc[updateItem] = updateData;
                    break;
            }

            profileDoc.save( error => error ? console.log(error) : false);

        }, error => error ? console.log(error) : false)
    };

injectCohort = (cohorts, cohortName) => {

// cohortName comes in in the form [cohort-name-style] and must be processed to be readable
    cohortName = cohortName.slice(cohortName.lastIndexOf('/')+1)
        .split('-')
        .map(e => e = `${e.slice(0,1).toUpperCase()}${e.slice(1)}`)
        .join(' ');

// if the passed cohortName does not exist in the array of user cohorts then add it
   if(!cohorts.some( cohort => cohort.cohortName === cohortName)){
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

