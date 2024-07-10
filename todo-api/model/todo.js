const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
