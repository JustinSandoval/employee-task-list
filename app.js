const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')
const Task = require('./models/task')
const dayjs = require('dayjs')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const tasks = await Task.find({})
    res.render('tasks/index', { tasks, dayjs })
})

app.get('/task/add', (req, res) => {
    res.render('tasks/add')
})

app.post('/task/add', async (req, res) => {
    const { task } = req.body
    const newTask = new Task(task)
    console.log(newTask)
    await newTask.save()
    res.redirect('/')
})

app.get('/task/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    res.render('tasks/show', { task, dayjs })
})

// patch route for checkbox
app.patch('/task/:id', async (req, res) => {
    const { id } = req.params

    const task = await Task.findByIdAndUpdate(id, {
        completed: req.body.completed
    })
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
