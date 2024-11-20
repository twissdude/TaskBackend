const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    deadline: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
