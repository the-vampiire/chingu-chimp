/**
 * Created by Vampiire on 7/2/17.
 */

const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const dbURL = process.env.dbURL;
mongoose.connect(dbURL, {useMongoClient : true}, e => e ? console.log(`error: ${e}`) : console.log('connected to database'));

const BP = require('body-parser');
// const logger = require('morgan');
const EJS = require('ejs');

const controller = require('./controller');

let port = process.env.PORT || 3000;
app.listen(port, e => e ? console.log(e) : console.log(`Server listening on port ${port}`));

// Middleware
app.use(BP.urlencoded({extended:false}));
app.use(BP.json());
// app.use(logger('dev'));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// Pass all routing to the controller
app.use('/', controller);












