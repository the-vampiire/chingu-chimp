/**
 * Created by Vampiire on 7/3/17.
 */

const database = require('./database');
const commands = require('./commands');
const verify = require('./verify');

module.exports = {
    database : database,
    commands : commands,
    verify : verify
};