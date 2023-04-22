const express = require('express')
const mongoose = require('mongoose')
const User = require('./BackEnd/User')
const usersRouter = require('./BackEnd/Users')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/Users', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const users = await User.find().sort({createdAt: 'desc'})
    res.render('FrontEnd/views/index', {books: books})
})

app.use('users', usersRouter)
app.listen(3000)