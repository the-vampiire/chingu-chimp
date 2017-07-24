 /**
 * Created by Vampiire on 7/2/17.
  *
  * all database commands
  *
 */

 const userProfile = require('../database/profileModel').userProfile;

 getProfile = (userName) => {
     return userProfile.find({userName : userName});
 };

 buildProfile = (data) => {

     return {
         userName: data.userName,
         portfolioURL: data.portfolioURL,
         joinDate: data.joinDate,
         story: data.story,

         cohort: [{
             cohortName: data.cohort.cohortName
         }],

         current: [{
             project: data.current.project,
             url: data.current.url
         }],

         completed: [{
             project: data.completed.project,
             url: {type: String, default: false},
             date: data.completed.date
         }],

         certifications: [{
             name: data.certifications.name,
             url: data.certifications.url,
             date: data.certifications.date
         }],

         aptitudes: {
             languages: [{
                 name: data.aptitudes.languages.name,
                 level: data.aptitudes.languages.level
             }],
             frameworks: [{
                 name: data.aptitudes.frameworks.name,
                 level: data.aptitudes.frameworks.level
             }]
         },

         sharable: data.sharable
     };
 };

 addProfile = (profileData) => {

 };

 const bulkModel = require('../database/bulkTest').model;
 testBulk = (data) => {
     let bulk = bulkModel.initializeOrderedBulkOp();
     bulk.insert({field1: data.field1});
 };


 module.exports = {

     getProfile : getProfile,
     testBulk : testBulk

 };
