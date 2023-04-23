var mongoose = require("mongoose");

var plantSchema = new mongoose.Schema({
    plantType: String,
    plantName: String,
    price: Number,
    advice: [String],
    picture: String,
    popular: Number
});


// Implement later, query for all bushes
plantSchema.statics.listAllBush = function() {};
// Implement later, query for all succulents
plantSchema.statics.listAllSucculent = function() {};
// Implement later, query for all bedded
plantSchema.statics.listAllBedded = function() {};

var plantModel = mongoose.model('plant', plantSchema);

module.exports = plantModel;