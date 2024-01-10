const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
    team_1_name: {type: String, required: true, maxLength: 50},
    team_2_name: {type: String, required: true, maxLength: 50},
    date_of_match: {type: Date}, 
    winner: {type: String, maxLength: 50},
});

FixtureSchema.virtual("fixturename").get(function () {
    let fName = "";

    if(this.team_1_name && this.team_2_name){
        fName = `${this.team_1_name} vs ${this.team_2_name}`;
    }
    return fName;
})

FixtureSchema.virtual("url").get(function() {
    return `/fixtures/${this.id}`;
})

module.exports = mongoose.model("Fixture", FixtureSchema);