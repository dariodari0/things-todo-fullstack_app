var mongoose = require('mongoose'); 
mongoose.set('debug', true); // to set debug mode (allow to see what happening wrong)
mongoose.connect('mongodb://localhost/api'); // connect to aplication database

mongoose.Promise = Promise; //for using Promise syntax (then)

module.exports.toDo = require("./todo"); // add a module that exports