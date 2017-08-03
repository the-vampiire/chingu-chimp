 /**
 * Created by Vampiire on 7/2/17.
  *
  * all database commands
  *
 */

 // ------------------- CORE EXPORTS --------------- //

 const requests = require('./requests');

 teamCheckin = () => {

 };

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
    checkin : checkinUpdate
 };
