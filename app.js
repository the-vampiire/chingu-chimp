/**
 * Created by Vampiire on 7/2/17.
 */

// dotenv for environmental variables
require('dotenv').config();

// Express server setup
const express = require('express');
const app = express();

let port = process.env.PORT || 3000;
app.listen(port, e => e ? console.log(e) : console.log(`Server listening on port ${port}`));

// Mongo Database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbURL = process.env.dbURL;
mongoose.connect(dbURL, {useMongoClient : true}, e => e ? console.log(`database connection error:\n${e}`) : console.log('connected to database'));

// Middleware
const BP = require('body-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

app.use('/public', express.static('public'));
app.use(BP.urlencoded({extended:false}));
app.use(BP.json());
app.use(logger('dev'));
// TODO: uncomment after adding favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ---------- REMOVE AFTER BETA TESTING ----------------
    const beta = require('./Beta/BETA_betaSlash');
    app.use('/beta', beta);
// ---------- REMOVE AFTER BETA TESTING ----------------

// --------------------------- ROUTES --------------------------- //

// --------- API --------- // 
    const APIendpoints = require('./API/APIendpoints');
    app.use('/API', APIendpoints);

// --------- SLASH COMMANDS --------- //

    // check-in slash command
        const checkin = require('./Slack/routes/slashCheckin');
        app.use('/checkin', checkin);

    // profile slash command
        const profile = require('./Slack/routes/slashProfile');
        app.use('/profile', profile);
    
    // update slash command
        const update = require('./Slack/routes/slashUpdate');
        app.use('/update', update); 

    // interactive messages
        const interactive = require('./Slack/routes/slashInteractive');
        app.use('/interactive', interactive);

// ------------ FRONT END ---------- //

const frontend = require('./public/Form/formController');
app.use('/', frontend);
