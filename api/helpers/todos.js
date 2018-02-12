var db = require("../models"); //make connect and take database variables

//list all todos GET route  - defining the Index Route - GET
exports.getTodos = function(req,res){
    db.toDo.find()
    .then(function(todos){
     res.json(todos);
    })
    .catch(function(err){
      res.send(err);
    })
}

// Create new todos POST Route - defining the Create Route - POST
exports.createTodo = function(req,res){
    db.toDo.create(req.body)
    .then(function(newToDo){
        res.status(201).json(newToDo);
    })
    .catch(function(err){
        res.send(err);
    })
}

// Retrieve a todos - defining the Show Route - GET
exports.getTodo = function(req,res){
    db.toDo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

// Update a todos - defining the Update Route - PUT
exports.updateTodo =  function(req,res){
   db.toDo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(function(todo){
       res.json(todo);
   })
   .catch(function(err){
       res.send(err);
   })
}

// Delete a todos - defining Delete Route - DELETE
exports.deleteTodo = function(req,res){
   db.toDo.remove({_id: req.params.todoId})
   .then(function(){
       res.send({message: "Now, it is removed!"});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;