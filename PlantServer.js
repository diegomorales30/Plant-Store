var express = require('express');
var mongoose = require('mongoose');
var app = express();
const path = require('path');
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017');
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

var plantModel = require("./BackEnd/src/PlantSchema");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.set('views', path.join(__dirname, 'FrontEnd/views'));
app.use(express.static(path.join(__dirname, 'FrontEnd')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd/views/succulent.html'));
})

app.post('/add', function(req, res) {
    var newPlant = new plantModel(req.body.plant);
    newPlant.save().then(function() {
        // Server response messages for debugging
        res.send("New plant added to db.");
    }).catch(function(err) {
        res.err("Failed to add plant to db.");
    });
});

// Request should be made with image name in parameters
// Ex: http://localhost:3000/plant?img=goldenbarrowlcatuse
app.get("/plant", function(req, res) {
    // Query for plant by image name
    plantModel.find({Picture : req.query.img}).then(function(plant) {
        res.render("plantInfo", {plant:plant});
    }).catch(function(error) {
        res.error("Something went wrong!" + error );
    });
});

app.listen(port, function() {
    console.log("App listening on port " + port + " !");
});