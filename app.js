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

// MongoDB Database
const mongoose = require('mongoose');
const dbURL = process.env.dbURL;
mongoose.connect(dbURL, {useMongoClient : true}, e => e ? console.log(`error: ${e}`) : console.log('connected to database'));

// Middleware
const BP = require('body-parser');
const EJS = require('ejs');

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(BP.urlencoded({extended:false}));
app.use(BP.json());

// Pass all routing to the controller
const controller = require('./controller');
app.use('/', controller);












