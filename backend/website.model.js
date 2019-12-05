const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Web = new Schema({
    web_link: {
        type: String
    },
    web_css_link: {
        type: String
    },
    web_js_link: {
        type: String
    }
});

module.exports = mongoose.model('Web', Web);