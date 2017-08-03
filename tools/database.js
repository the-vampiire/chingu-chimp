 /**
 * Created by Vampiire on 7/2/17.
  *
  * all database commands
  *
 */

 const userProfile = require('../database/profileModel').userProfile;
 const checkInModel = require('../database/profileModel').checkinModel;
 const mongoose = require('mongoose');

 // ------------------- CORE EXPORTS --------------- //

 getProfile = userName => {
     return userProfile.find({userName : userName}, {_id: false});
 };

 getProfileItem = (userName, item) => {
     // always need to pull out the item with [0] for the first element in the returned array
     return userProfile.find({userName: userName}, `${item} -_id`);
 };

 addProfile = profileData => {
    userProfile.create(profileData, e => console.log(e));
 };

 updateProfile = (userName, updateObject) => {
     userProfile.find({userName : userName}).update(updateObject);
 };

 checkinUpdate = (userName, channelID, valueObject) => {

     getProfile(userName).then( doc => {
         doc = doc[0];
         const checkins = doc.checkins;
         console.log(checkins);

         let newCheckIn = new checkInModel({
             channelID : channelID,
             log : [valueObject]
         });

         console.log(newCheckIn);
         // checkins.push(newCheckIn);

         // console.log(checkins[0].log);

     });
 };

 const requests = require('./requests');

 injectPartners = (payload, valueObject) => {

     return requests.channel(payload.channel.id).then( IDs => {
         let promises = [];
         IDs.forEach( ID => promises.push(requests.convertID(ID)));
         return Promise.all(promises);
     }).then( partners => {
         valueObject.partners = partners.filter( partner => partner !== 'chance');
         valueObject.partners.forEach( partner => {

         });
         // database update function
         // search for user
         // pass value object
         return valueObject;
     });
 };

 // --------------------- TOOLS ---------------------- //


 module.exports = {
    getProfile : getProfile,
    getProfileItem : getProfileItem,
    addProfile : addProfile,
    checkin : checkinUpdate
 };
