const express = require('express')
const User = require('./User')
const router = express.Router()

router.post('/', async (req, res) =>{

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        user = await user.save()
        res.redirect(`/users/${user}`)
    } catch(e){
        //res.render('users/new', {user: user})
    }

})