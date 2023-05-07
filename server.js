const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./BackEnd/src/Users');
const plantsRouter = require('./BackEnd/src/PlantServer');
const app = express();
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017')
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

var User = require("./BackEnd/src/User");

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json())
app.set('views', path.join(__dirname, 'FrontEnd/views'));
app.use(express.static(path.join(__dirname, 'FrontEnd')));
app.use(express.static(path.join(__dirname, 'BackEnd')));

app.get('/', async (req, res) => {
    const users = await User.find().sort({createdAt: 'desc'})
    res.render('index', {users: users})
})

app.listen(port, function(){
    console.log("App listening on port " + port + "!")
})

app.use('/Users', usersRouter)
app.use(plantsRouter)

app.get('/About', async (req, res) => {
    const user = await User.findOne({username:req.query.username});
    res.render('About', {user:user});
});

app.get('/cart', async (req, res) => {
    const user = await User.findOne({username : req.query.username});     
    res.render('cart', {user:user});
});