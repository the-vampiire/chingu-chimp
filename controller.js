/**
 * Created by Vampiire on 7/2/17.
 *
 *
 * FOR ADDITIONAL SECURITY
 *      get list of all chingu team names (team ID's) and add them to the slash verify function
 *      to check alongside the slack token. ensures all requests only occur between chingu teams and bot
 *
 */

const express = require('express');
const router = module.exports = express.Router();

const tools = require('./tools/exporter');


// ------------------- FRONT END ------------------- //

router.get('/form', (req, res) => {

    res.render('form');

});

router.post ('/create-profile', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile;
    userProfile.addProfile(req.body.userData);

    res.json({userCreated: true})
});

router.post('/validate-username', (req, res) => {
    const userProfile = require('./database/profileModel').userProfile
    
    let userNameAvailable;
    userProfile.find({userName: req.body.userName})
        .then( user => {
            userNameAvailable = user.length > 0 ? false : true;
            res.json({userNameAvailable});
        })
        .catch( err => console.log(err));
})

router.get('/', (req, res) => {

    let data = {
        userName : 'jessec',

        portfolio : 'https://www.vampiire.org',
        gitHub: 'https://www.github.com/the-vampiire',
        blog: 'https://medium.com/@vampiire',

        story: `Hello you can call me Vamp. This is my third Chingu cohort (Walrus / Honey-Badger)

*Background*
I have a B.S. in Chemical Engineering from USF. During my time there I overloaded on experiences from leadership to research and internships. Despite all my involvement I didn’t have much of a passion for working professionally as a ChE. I took time off after graduation where I worked as a janitor. Not as a career path but because I needed a job that wouldn’t tax my mind while I thought about what I wanted out of my future. which leads to…

*Coding History* 
I started coding at the end of February 2017. Before that I had literally 0 experience with code besides using Excel to solve ChE problems (goalseek / solver). I began with javascript and solving algorithm challenges especially the Project Euler problems. Soon I realized that Python was a much more popular language for solving these problems so I switched over. About a month later I was obsessed and realized being a developer was my calling.  

I was beginning my application to Hack Reactor when I came across a scathing article from a former student of theirs. They suggested Free Code Camp so I committed to working through their curriculum. I worked feverishly on the front end certification and finished it in 58 days without looking up guides or solutions to any project or algorithm challenge (https://www.vampiire.org is the site I built which holds all the projects). I wasn’t rushing I just couldn’t stop coding and learning - I dreamt (and still do!) about coding and worked out problems I couldn’t solve awake. 

After the certification I joined my first Chingu cohort and started learning backend code. Since then I have worked on the FCC backend projects, a slack bot, a small business automation suite for my dad, and building an online multiplayer pong game from scratch…with lasers! Most recently I started learning Angular to round out my skillset. 

*Goals*
I have started scouting for jobs and seeing how I match up with their expectations. I hope that with enough projects and my passion for coding I will be given a chance to prove myself as a developer. 

I am determined to lead my bot team to a successful completion and launch of our project. 

*Interests* 
Asking questions. I ask way too many questions. Solving problems no matter the context. Brainstorming and improving on ideas. Teaching or explaining concepts to people. Playing Destiny (pvp!) until my eyes hurt. Hiking with my two boston terriers. Biking. Lifting heavy things and putting them down a bunch of times a week. Heavy synth / electronic music. Oh and uh…CODING!`,

        joinDate: 1495238400,

        cohort: [
            {
                cohortName : 'Walruses',
                startDate : 1495238400
            },
            {
                cohortName : 'HoneyBadgers',
                startDate : 1497916800
            }],

        aptitudes: {

            languages : [{
                name : 'JavaScript',
                level : 'intermediate'
            }],

            frameworks: [{
                name : 'Bootstrap',
                level : 'intermediate'
            }]
        },

        projects: [{}],

        certifications: [{}]

    };


    const userProfile = require('./database/profileModel').userProfile;

    userProfile.addProfile(data);

    res.end('made a new profile');

    // userProfile.getProfile('vampiire').then( doc => console.log(doc.checkins[0].sessions));


});



// ------------------- BACK END -------------------- //


// ------------ INCOMING SLASH COMMANDS ------------- //

// ----- CHECK-IN ----- //
router.post('/checkin', (req, res) => {

    const body = req.body;

    if(tools.verify.slash(body.token)) {

        if(!body.text || /^(@[0-9A-Za-z-_.]+( )?)+$/.test(body.text)){
            const user = body.user_name;

            let valueObject = {};

        // filter results to only pass @userName tags then strip the '@' symbol
            let filtered = body.text.split(' ').filter( e => /@[0-9A-Za-z-_.]+/g.test(e));
            filtered.forEach( (e, i, a) => a[i] = e.replace(/\@/g, ''));

        // inject the filtered and stripped partners array into the valueObject
            valueObject.partners = filtered;
        // inject the user calling the checkin so they dont have to tag themselves
            valueObject.partners.push(user);

            res.json(tools.interactive.interaction('checkin', valueObject));
        }
        else res.end('*Invalid checkin command format. Try `/checkin [@userName] [@otherUserName(s)]`. you do not need to tag yourself, the user calling the check-in command is automatically included*');


    }
    else res.end('invalid Slack token');



});

// ----- DISPLAY PROFILE / ITEM ----- //
router.post('/profile', (req, res) => {

    const body = req.body;
    const text = body.text;

    if(tools.verify.slash(body.token)){

        const profileResponse = require('./responses/profileResponses');

        if(!text || text === 'help'){
            res.end(profileResponse.profileHelp());
        }

        if(text && text !== 'help') {
            if (/^\@[0-9A-Za-z-_.]+( share)?( (story|projects|skills|certifications|gitHub|blog|portfolio|))?$/.test(text)) {

                let share = false;
                let item;

                const arguments = text.split(' ');
                let userName = arguments[0].replace(/@/, '');

                if(arguments[1]){
                    if(~arguments[1].indexOf('share')){
                        share = true;

                        if(arguments[2]) item = arguments[2];
                    }
                    else item = arguments[1];
                }


                if(item) profileResponse.profileItem(userName, item, share).then( response => typeof response === 'string' ?
                    res.end(response) : res.json(response));
                else profileResponse.profileCard(userName, share).then( response => res.json(response));

            }

            else res.send(`[\`${text}\`] is not a valid username.
            try again with the format \`/profile <@userName> [share] [profile item]\`
            you may only call one profile look-up at a time`);
        }
    }
    else res.end('invalid Slack token');

});

// ----- UPDATE PROFILE ----- //
router.post('/update', (req, res) => {

    const updateResponse = require('./responses/updateResponses');
    const update = require('./tools/update');
    const userProfile = require('./database/profileModel').userProfile;

    const body = req.body;
    const userName = body.user_name;
    const cohortName = body.team_domain;
    const arguments = body.text;

    if(tools.verify.slash(body.token)){
        if(~arguments.indexOf(' ')){
            let parserOutput = update.parse(arguments);

            if(typeof parserOutput === 'string') res.end(parserOutput);
            else userProfile.processUpdate(userName, cohortName, parserOutput).then( response => res.end(response));

        }

        else{
            if(!arguments || arguments === 'help') res.end(updateResponse.helpResponse('help'));

            else if(arguments === 'skills'){
                const output = tools.interactive.interaction(('update'));
                if(output instanceof Promise) output.then( response => {
                    if(typeof response === 'string') res.end(response);
                    else res.json(response);
                });
                else res.json(output);
            }

            else if(arguments === 'picture'){
                const userID = body.user_id;
                const userProfile = require('./database/profileModel').userProfile;

                tools.requests.userData('pic', userID).then( picObject => {
                    let data = { item: 'profilePic', updateData : picObject };
                    userProfile.processUpdate(userName, cohortName, data).then( response => res.end(response));
                });
            }
            else res.end(updateResponse.helpResponse(arguments));
        }
    }

    else res.end('invalid Slack token');

});

// ------------ INTERACTIVE MESSAGES ---------------- //

// used to handle interactive message responses / submissions
router.post('/interactive', (req, res) => {

    const payload = JSON.parse(req.body.payload);

    if(tools.verify.slash(payload.token)){
        let output = tools.interactive.process(payload);

        if(output instanceof Promise) output.then( response => {
            if(typeof response === 'string') res.end(response);
            else res.json(response);
        });
        else res.json(output);
    }

    else res.end('invalid Slack token');

});

// ------------ INCOMING API CALLS ---------------- //



