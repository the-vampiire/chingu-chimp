/**
 * Created by Vampiire on 7/7/17.
 */

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({

    cohorts : [{
        cohort: String
    }],

    languages : [{
        language: String
    }],

    frameworks : [{

    }],

});
