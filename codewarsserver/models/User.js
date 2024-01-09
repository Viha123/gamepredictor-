//User.js
//user aggreages predictions and fixtures
//user will have first name and email
//then they can update

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, require: true}, 
    email: {type: String, require: false},
    password: {type:String, require: true},
    realPredictions: [],
})
UserSchema.virtual("url").get(function() {
    return `/users/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);
