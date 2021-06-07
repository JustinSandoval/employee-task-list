const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema(
    {
        title: String,
        description: String,
        completed: Boolean,
        deadline: Date
    },
    {
        timestamps: {}
    }
)

module.exports = new mongoose.model('Task', TaskSchema)

/* 
on the front end is where you would compare the two dates and then from then mark as disabled if expired
or sort disabled ones?
*/
