/**
 * Created by Vampiire on 7/3/17.
 *
 */


const mongoose = require('mongoose');
const requests = require('../Slack/tools/requests');
const dbHelper = require('./dbHelpers');

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
        size_original : String
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

// define a class to hold the static methods
class User {

// general static methods
    static addProfile(formData) {
        this.create(formData, error => console.log(error));
    }

    static getProfile(userName) {
        return this.findOne({userName : userName});
    }

    static getProfileItem(userName, item) {
        return new Promise((resolve, reject) => {
            this.findOne({userName : userName}, item).then(profileItem => {
                if(profileItem) resolve(profileItem[item]);
                else reject(`User [${userName}] not found.`);
            })
        });
    }

// custom static methods 

    static processCheckin(userName, checkinSessionData, cohortDetails) {

        const channelID = cohortDetails.channelID;
        const cohortName = cohortDetails.cohortName;
        const teamID = cohortDetails.teamID;
        const userID = cohortDetails.userID;

        return new Promise( (resolve, reject) => {
    
            this.getProfile(userName).then( profileDoc => {
                if(profileDoc){
    
                    // check if the cohort the user is updating from is in the user's cohorts array. if not - add it
                    profileDoc.cohorts = dbHelper.checkAndAddCohort(profileDoc.cohorts, cohortName, teamID, userID);
    
                    // check if the user has all appropriate badges. if not - add them
                    profileDoc.badges = dbHelper.checkAndAddBadges(profileDoc);
        
                    const checkins = profileDoc.checkins;
                    let channel = checkins.find( e => e.channelID === channelID);
    
                    channel ?
                        channel.sessions.push(checkinSessionData) :
                        checkins.push(new checkinModel({channelID : channelID, sessions : [checkinSessionData]}));
    
                    const streakUpdate = dbHelper.streakUpdater(checkins, profileDoc.currentStreak, profileDoc.bestStreak);
                    profileDoc.currentStreak = streakUpdate.currentStreak;
                    profileDoc.bestStreak = streakUpdate.bestStreak;
    
                    profileDoc.lastCheckin = checkinSessionData;
                    profileDoc.totalCheckins++;
    
                // after updating is complete check if the user has all earned badges. if not - add them
                    profileDoc.badges = dbHelper.checkAndAddBadges(profileDoc);
    
                    profileDoc.save( (saveError, success) => {
    
                        if(saveError) reject(saveError);
    
                        if(success){
                            userName = `${userName.slice(0,1).toUpperCase()}${userName.slice(1)}`;
    
                            if(channel) resolve(`Succesfully saved the check-in for ${userName}. you have \`${channel.sessions.length}\` check-ins on this channel!\n*Total check-ins:* \`${profileDoc.totalCheckins}\`\n*Current streak:* \`${profileDoc.currentStreak.value}\` days\n*Best streak:* \`${profileDoc.bestStreak}\` days\n`);
    
                            else resolve(`Succesfully saved the check-in for ${userName}. This is your first check-in on this channel, keep it up!\n*Total check-ins:* \`${profileDoc.totalCheckins}\`\n*Current streak:* \`${profileDoc.currentStreak.value}\` days\n*Best streak:* \`${profileDoc.bestStreak}\` days\n`);
                        }
                    });
                }
    
            // user not found
                else resolve(`*Check-in for \`@${userName}\` failed:*\n*Profile \`@${userName}\` not found*\n*Create a profile <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>*\n`);
            });
        });
            }

    static processUpdate(userName, data, cohortDetails) {

        const cohortName = cohortDetails.cohortName;
        const teamID = cohortDetails.teamID;
        const userID = cohortDetails.userID;

        return new Promise((resolve, reject) => {
            this.getProfile(userName).then( profileDoc => {
    
                if(profileDoc){
    
                    // check if the cohort the user is updating from is in the user's cohorts array. if not - add it
                    profileDoc.cohorts = dbHelper.checkAndAddCohort(profileDoc.cohorts, cohortName, teamID, userID);
    
                    let updateItem = data.item;
                    let updateData = data.updateData;
    
                    switch(updateItem){
                        case 'certifications':
                            const certifications = profileDoc[updateItem];
    
                        // checks if the passed certificate already exists. adds it if it doesn't
                            const addNewCertificate = !certifications.some( certificate => certificate.name === updateData.name );
    
                            if(addNewCertificate) profileDoc[updateItem].unshift(updateData);
                            break;
                        case 'projects':
                        // checks for an existing project - matching either project name or gitHub repo
                        // if it exists it is updated with the new data, if not a new project is added
                            const addNewProject = !profileDoc[updateItem].some( (project, index, projects) => {
                                if(project.name === updateData.name || project.gitHub === updateData.gitHub){
                                    projects[index] = updateData;
                                    return true
                                }
                            });
    
                            if(addNewProject) profileDoc[updateItem].unshift(updateData);
                            break;
                        case 'skills':
                            const subUpdateItem = data.subItem;
                            const skillsItem = profileDoc[updateItem][subUpdateItem];
    
                            const addNewSkill = !skillsItem.some( (skill, index, skills) => {
                                if(skill.name === updateData.name){
                                    skills[index].level = updateData.level;
                                    return true
                                }
                            });
    
                            if(addNewSkill) skillsItem.push(updateData);
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
    
                    // after updating is complete check if the user has all earned badges. if not - add them
                    profileDoc.badges = dbHelper.checkAndAddBadges(profileDoc);
    
                // final validation of urls. executes a head request to determine the validity of the link
                    if(['blog', 'gitHub', 'portfolio', 'projects', 'certifications'].includes(updateItem)){
                        const request = require('request');
                        const url = updateData.url ? updateData.url : updateData.gitHub;
    
                        // if(updateItem === 'certifications'){
                        //     request({url: url, followRedirect: false}, (err, res) => {
                        //         if(err) reject(err);
                        //         else console.log(res.headers.location);
                        //     });
                        // }
    
// put a try / catch here?
                        request({url: url, method: 'HEAD'}, (error, response) => {
                            if(error) reject('*Invalid url. Domain is invalid. Connection refused error received during validation*');
    
                            else if(response.statusCode !== 200) reject(`*Invalid url. Domain is valid but the route returned a \`${response.statusCode}\` error during validation*`);
                            else {
                                profileDoc.save((error, success) => {
                                    if(error) reject(`Saving to the database failed. Error message:\n${error}`);
                                    else if(success) resolve(`*Successfully updated your ${updateItem}*`)
                                });
                            }
                        });
                    }
    
                // if url validation does not apply then save as usual
                    else {
                            profileDoc.save( (saveError, success) => {
                                if(saveError) reject(`error updating ${updateItem} for ${userName}`);
    
                                if(success){
                                    if(updateItem === 'skills')
                                        resolve(`*Successfully updated your ${data.subItem}: ${updateData.name} at the ${updateData.level} skill level*`);
    
                                    else resolve(`*Successfully updated your ${updateItem}*`);
                                }
                            });
                    }
                }
    
            // user not found
                else resolve (`*Update for \`@${userName}\` failed:*\n*Profile \`@${userName}\` not found.*\nCreate a profile <https://chingu-chimp.herokuapp.com/public/createProfile.html|here>*\n`);
    
            })
            
                })
    }
}

userSchema.loadClass(User);
const userProfile = mongoose.model('userProfile', userSchema);

module.exports = {
    userSchema,
    userProfile,
    checkinSchema,
    checkinModel
};




