const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    todo: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Task', TaskSchema)
