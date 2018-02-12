//Schema: name, completed, created_date

var mongoose = require("mongoose");

var toDoSchema =  new mongoose.Schema({
    name: {
    type: String,
    required: 'Name cannot be empty!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var toDo = mongoose.model('toDo', toDoSchema );
module.exports = toDo;