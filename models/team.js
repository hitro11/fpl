const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

var TeamSchema = new mongoose.Schema({
    name: String,
    manager: String,
    squad: String,
    points: String
});

TeamSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Team", TeamSchema);