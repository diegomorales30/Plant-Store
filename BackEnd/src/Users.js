const express = require('express')
const User = require('./User')
const router = express.Router()

router.post('/', async (req, res) =>{
    if(User.find({ email: req.body.email}) == null){
        let user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password
        })
    }
    else res.redirect('/')
    try{
        user = await user.save()
        res.redirect(`/About`)
    } catch(e){
        //res.render('users/new', {user: user})
    }

})

router.get('/:email', async (req, res) =>{
    const user = await User.findOne({email : req.query.email, password : req.query.password})
    if(user == null) res.redirect('/')
    res.render('/About/?username=' + user.username, {user:user})
})



module.exports = router;