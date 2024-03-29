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
    const exists = await this.findOne({email: email});
    if (exists) throw new Error("Email already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.create({
        username: username,
        email: email,
        password: hashedPass,
    });
    // await user.save();

    return user;
}
UserSchema.statics.authenticate = async function(username, password){
    const user = await this.findOne({ username: username });
  
    if (!user) throw new Error("User does not exist");

    const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result);
        });
    });

    return match ? user : null;
    
}
module.exports = mongoose.model("User", UserSchema);
