const express = require('express')
const User = require('./User')
const router = express.Router()

// POST request to check if user exists and insert into database
// Redirect user to homepage with user's session if already exists with correct info
router.post('/', async (req, res) =>{
    var user = await User.findOne({email: req.body.email}).lean()
    if(user == null) {
        let user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password
        })
        try{
            user = await user.save()
            res.redirect(`/About?username=${user.username}`)
        } catch(e){
            //res.render('users/new', {user: user})
        }
    }
    else {
        res.redirect(`/About?username=${user.username}`);
    } 
})

// GET request to render homepage with either guest or user login
router.get('/', async (req, res) =>{
    const user = await User.findOne({email : req.query.email, password : req.query.password})
    if (user == null) {
        res.redirect('/')
        return
    }
    res.redirect(`/About?username=${user.username}`);
})

module.exports = router;