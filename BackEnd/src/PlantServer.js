var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017');
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

var plantModel = require("./PlantSchema");

