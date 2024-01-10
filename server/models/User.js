//User.js
//user aggreages predictions and fixtures
//user will have first name and email
//then they can update

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, require: true, unique: true}, 
    email: {type: String, require: false, unique: true},
    password: {type:String, require: true},
    realPredictions: [],
})
UserSchema.virtual("url").get(function() {
    return `/users/${this._id}`;
})
UserSchema.statics.signUp = async function(username, email, password){
    const {username, email, password} = req.body;
    const exists = await this.findOne({email: email});
    if (exists) throw new Error("Email already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        email: email,
        password: hashedPass,
    });
    await user.save();

    return user;
}

module.exports = mongoose.model("User", UserSchema);
