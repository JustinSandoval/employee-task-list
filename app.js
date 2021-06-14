require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')
const Task = require('./models/task')
const dayjs = require('dayjs')
const methodOverride = require('method-override')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { storage } = require('./cloudinary')
const upload = multer({ storage })
const isComplete = require('./public/js/isComplete.js')

// mongoose.connect('mongodb://mongo:27017/task-list', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

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
app.use(express.static(path.join(__dirname, 'public')))

// index list page
app.get('/', async (req, res) => {
    const tasks = await Task.find({})

    res.render('tasks/index', { tasks, dayjs, isComplete })
})

// add new task
app.post('/task/add', upload.array('file'), async (req, res) => {
    const { task } = req.body
    const newTask = new Task(task)
    newTask.files = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await newTask.save()
    // console.log(newTask)

    res.redirect('/')
})
// show route
app.get('/task/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)

    res.render('tasks/show', { task, dayjs, isComplete })
})

// update task
app.put('/task/:id', upload.array('file'), async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    const task = await Task.findByIdAndUpdate(id, {
        ...req.body.task
    })
    const files = req.files.map(f => ({ url: f.path, filename: f.filename }))
    task.files.push(...files)
    await task.save()
    if (req.body.deleteFiles) {
        for (let filename of req.body.deleteFiles) {
            await cloudinary.uploader.destroy(filename)
        }
        // update found task and pull from files array, all files where the filename of that file is in req.body.deleteFiles array
        await task.updateOne({
            $pull: { files: { filename: { $in: req.body.deleteFiles } } }
        })
    }

    res.redirect(`/task/${task._id}`)
})

// patch route for checkbox
app.patch('/task/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, {
        completed: req.body.completed
    })
    res.redirect('/')
})

// delete task
app.delete('/task/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    for (let file of task.files) {
        await cloudinary.uploader.destroy(file.filename)
    }
    await Task.findByIdAndDelete(id)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
