

let user = require('./database/profileModel').userProfile;

let a = new Promise( (resolve, reject) => {
    user.getProfileItem('vampiire', 'story').then( profileItem => {
        resolve('worked');
        reject('failed');
    })
});

a.then( e => console.log(e)).catch( e => console.log(e));