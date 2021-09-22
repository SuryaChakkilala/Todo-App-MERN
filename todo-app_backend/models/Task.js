const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
})

exports.Task = mongoose.model('Task', taskSchema)