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
const dbURL = process.env.dbURL;
mongoose.connect(dbURL, {useMongoClient : true}, e => e ? console.log(`error: ${e}`) : console.log('connected to database'));

// Middleware
const BP = require('body-parser');
const logger = require('morgan');
const faviocon = require('serve-favicon');
const EJS = require('ejs');

const controller = require('./controller');

let port = process.env.PORT || 3000;
app.listen(port, e => e ? console.log(e) : console.log(`Server listening on port ${port}`));

// Middleware

app.use('/public', express.static('public'));
app.use(BP.urlencoded({extended:false}));
app.use(BP.json());
app.use(logger('dev'));
// TODO: uncomment after adding favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// Pass all routing to the controller
const controller = require('./controller');
app.use('/', controller);












