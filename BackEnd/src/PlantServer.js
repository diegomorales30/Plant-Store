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
// adds a plant to the user cart and the only way to add plants to a shopping cart
// if that you have to be logged in
app.get("/addtocart", async function(req,res) {
    // finds the plant from the data base 
    var plant = await plantModel.findOne({Picture:req.query.plantpid}).lean();
    //finds the user from the data base
    var user = await User.findOne({username:req.query.user}).lean();
    // Gets the limit from the quanity field in the data base
    var plantlimit = plant.Quantity;

    // checks to see if user amount is greater than the plantlimit
    // if it is then the the user has to get a different amount to add to thier cart
    if (req.query.useramount > plantlimit) {
        res.send("User demand is greater than quanity aviable");
    }
    // if the useramount is less than plantlimit then the item is added to thier shopping cart
    else {
        plant.Quantity = req.query.useramount;
        user.cart.push(plant);
        User.updateOne({username:user.username},{cart:user.cart}).then( function() {
            res.send("Plant was added to account");
        })
    }
});

module.exports = app;