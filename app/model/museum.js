var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    objectID: {
        type: String,
        required: true,
        unique: true
    },
    isHighLight: {
        type: String,
        default: ''
    },
    accessionNumber: {
        type: String,
        default: ''
    },
    accessionYear: {
        type: String,
        default: ''
    },
});

var museum = new mongoose.model('Museum', schema);

module.exports = museum;