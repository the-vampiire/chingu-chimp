/**
 * Created by Vampiire on 7/7/17.
 */

const mongoose = require('mongoose');

// stores dropdown list items for the forms

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
