const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')

mongoose.connect('mongodb://localhost:27017/task-list', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const app = express()

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('tasks/index')
})

app.get('/task/add', (req, res) => {
    res.render('tasks/add')
})

app.post('/task/add', (req, res) => {
    const { title, description, deadline } = req.body
    console.log(title)
    console.log(description)
    console.log(deadline)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
