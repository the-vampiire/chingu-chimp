/**
 * Created by Vampiire on 7/24/17.
 */

const mongoose = require('mongoose');

const bulkSchema = new mongoose.Schema({
    field1: String,
    field2: String,
    field3: String,
    date: {type: Number, default: Date.now()}
});

const bulkModel = mongoose.model('bulkModel', bulkSchema);

module.exports = {
  model: bulkModel,
    schema: bulkSchema
};
