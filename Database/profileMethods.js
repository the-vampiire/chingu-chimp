// Profile Methods -> imported into profileModel.js and loaded into the schema

const dbHelper = require('./dbHelpers');

module.exports = class profileMethods {
    
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
            
                        const checkins = profileDoc.checkins;
    
                        const streakUpdate = dbHelper.streakUpdater(checkins, profileDoc.currentStreak, profileDoc.bestStreak);
                        profileDoc.currentStreak = streakUpdate.currentStreak;
                        profileDoc.bestStreak = streakUpdate.bestStreak;
    
                        let channel = checkins.find( e => e.channelID === channelID);
                        channel ?
                            channel.sessions.push(checkinSessionData) :
                            checkins.push({channelID : channelID, sessions : [checkinSessionData]});
        
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
    
                    // if the user does not have a profilePic then pull it from Slack
                        if(profileDoc.profilePic){
                        // if the user has a picture but it hasn't been updated in 14 days - update it
                            if(Number(Date.now()) - profileDoc.profilePic.lastUpdate >= 1209600000){
                                this.updatePicture(userName, userID);
                            }
                        }
                        else this.updatePicture(userName, userID);
        
                    // final validation of urls. executes a head request to determine the validity of the link
                        if(['blog', 'gitHub', 'portfolio', 'projects', 'certifications'].includes(updateItem)){
                            const request = require('request');
                            const url = updateData.url ? updateData.url : updateData.gitHub;
        
                            request({url: url, method: 'HEAD', followRedirect: false, timeout: 1}, (error, response) => {
                                if(error !== undefined) reject(`Invalid url:\n${error}`);

                                else {
                                    const status = response.statusCode;
                                    // invalid FCC certificate links will cause a redirect to the FCC homepage. 
                                        if(status > 300 && status < 400 && updateItem === 'certifications'){
                                            reject(`*Invalid certification link. Free Code Camp certificate validation failed.*`);
                                        }
        
                                        else if(status !== 200){
                                            reject(`*Invalid url. Domain is valid but the route returned a \`${response.statusCode}\` error during validation*`);
                                        }
        
                                        else {
                                            profileDoc.save((error, success) => {
                                                if(error) reject(`Saving to the database failed. Error message:\n${error}`);
                                                else if(success) resolve(`*Successfully updated your ${updateItem}*`)
                                            });
                                        }
                                }   
                            });  
                        }
        
                    // if url validation does not apply then save as usual
                        else {
                                profileDoc.save( (saveError, success) => {
                                    if(saveError) reject(`error updating ${updateItem} for ${userName}`);
        
                                    if(success){
                                        if(updateItem === 'skills'){
                                            const response = updateData.level === 'hide' ? 
                                            `*Succesfully hid ${updateData.name} from your ${data.subItem} section*` :
                                            `*Successfully updated your ${data.subItem}: ${updateData.name} at the ${updateData.level} skill level*`

                                            resolve(response);
                                        }
                                    
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
    
        static updatePicture(userName, userID){
            const requests = require('../Slack/tools/requests');
            requests.userPicture(userID).then( picData => {
                this.getProfile(userName).then( profileDoc => {
                    profileDoc.profilePic = picData;
    
                    profileDoc.save((saveError, success) => {
                        if(saveError) console.log(saveError);
                        else console.log('saved image successfully');
                    })  
                })
            })
        }
    }