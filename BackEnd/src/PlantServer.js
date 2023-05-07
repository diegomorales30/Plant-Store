var express = require('express');
var mongoose = require('mongoose');
var app = express.Router();
const User = require('./User')
const path = require('path');
const port = 3000;

var plantModel = require("./PlantSchema");

app.get('/succulents', async (req, res) => {
    const user = await User.findOne({username : req.query.username});     
    res.render('succulent', {user:user})
})

app.get('/beddings', async (req, res) => {
    const user = await User.findOne({username : req.query.username});     
    res.render('bedding', {user:user})
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
app.get("/plant", async (req, res) => {
    const user = await User.findOne({username : req.query.username});     
    const plant = await plantModel.findOne({Picture : req.query.id});
    res.render("plantInfo", {plant:plant, user:user});
});

//Ex http://localhost:3000/user?=name&&plantpid=picturename&&useramount=3
app.get("/addtocart", async function(req,res) {
    var plant = await plantModel.findOne({Picture:req.query.plantpid}).lean();
    var user = await User.findOne({username:req.query.user}).lean();
    var plantlimit = plant.Quantity;
    if (req.query.useramount > plantlimit) {
        res.send("User demand is greater than quanity aviable");
    }
    else {
        plant.Quantity = req.query.useramount;
        user.cart.push(plant);
        User.updateOne({username:user.username},{cart:user.cart}).then( function() {
            res.send("Plant was added to account");
        })
    }
});

module.exports = app;