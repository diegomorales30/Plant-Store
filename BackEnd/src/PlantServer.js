var express = require('express');
var mongoose = require('mongoose');
var app = express.Router();
const path = require('path');
const port = 3000;

var plantModel = require("./PlantSchema");

app.get('/succulents', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../FrontEnd/views/succulent.html'));
})

app.get('/beddings', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../FrontEnd/views/bedding.html'));
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
// Ex: http://localhost:3000/plant?id=goldenbarrowlcatuse
app.get("/plant", function(req, res) {
    // Query for plant by image name
    plantModel.find({Picture : req.query.id}).then(function(plant) {
        res.render("plantInfo", {plant:plant});
    }).catch(function(error) {
        res.error("Something went wrong!" + error );
    });
});

//Ex http://localhost:3000/user?=name&&plant=picturename&&usernumberwant=3
app.post("/addtocart",function(req,res){
    var plant = plantModel.find({Picture:req.query.plant});
    var user = userModel.find({username:req.query.user});
    var plantlimit = plant.quantity;
    if (req.query.useramount > plantlimit){
        res.send("User demand is greater than quanity aviable");
    }
    else{
        user.cart.push(plant);
        User.updateOne({username:user.userName},{cart:user.cart},function(req,res){
            res.send("Plant was added to account");
        });
    }
});

module.exports = app;