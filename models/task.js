const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    dateCreated: Date,
    dateComplete: Date
})

module.exports = new mongoose.model('Task', TaskSchema)
