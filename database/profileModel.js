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
    userSchema.statics.processCheckin = function(userName, channelID, valueObject){
        this.findOne({userName:userName}).then( profileDoc => {
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

            profileDoc.save( saveError => console.log(`error during checkin update saving \n ${saveError})`));

        }, userFindError => console.log(userFindError));
    };

    // ------- UPDATE PROCESSING ------- //
    userSchema.statics.processUpdate = function(userName, data){
        this.findOne({userName: userName}).then( profileDoc => {

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

            // simple string
                case 'story':
                    profileDoc[updateItem] = updateData;
                    break;
            }

            profileDoc.save( error => error ? console.log(error) : false);

        }, error => error ? console.log(error) : false)
    };

    const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema : userSchema,
    userProfile : userProfile,
    checkinSchema : checkinSchema,
    checkinModel : checkinModel
};

