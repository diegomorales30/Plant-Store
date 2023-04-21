var mongoose = require("mongoose");

var plantSchema = new mongoose.Schema({
    plantType: String,
    plantName: String,
    price: Number,
    advice: [String],
    picture: String,
    popular: Number
});


// Bush 
plantSchema.statics.listAllBush = function() {}
// Succulent
plantSchema.statics.listAllSucculent = function() {}
// Bedded
plantSchema.statics.listAllBedded = function() {}