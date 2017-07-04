/**
 * Created by Vampiire on 7/2/17.
 */

const express = require('express');
const app = express();

const BP = require('body-parser');
const EJS = require('ejs');

const controller = require('./controller');

let port = process.env.PORT || 3000;
app.listen(port, e => e ? console.log(e) : console.log(`Server listening on port ${port}`));

// Middleware
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(BP.urlencoded({extended:false}));
app.use(BP.json());

// Pass all routing to the controller
app.use('/', controller);












