const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PredictionSchema = new Schema({
    fixture: {type: Schema.Types.ObjectId, ref: "Fixture", required: true},
    prediction: {type: String},
});

PredictionSchema.virtual("url").get(function() {
    return `/predictions/${this._id}`;
});

module.exports = mongoose.model("Prediction", PredictionSchema);