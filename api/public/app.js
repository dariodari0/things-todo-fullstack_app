/* global $*/
$(document).ready(function() {

    $.getJSON("/api/todos")
        .then(addTodos)
        .catch(function(err) {
            console.log(err);
        });

    $('#todoInput').keypress(function(event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $(".list").on('click', 'li', function() {
        updateTodo($(this));
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    // $(".list").sortable();
    // $(".list").disableSelection();

});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    //to get id - "todo._id"
    //better way is use with .data() method because we will not public our id
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    var usrInput = $('#todoInput').val();
    $.post('/api/todos', { name: usrInput })
        .then(function(newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function removeTodo(todo) {
    var clickedID = todo.data('id');
    var deleteUrl = 'api/todos/' + clickedID;
    $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(data) {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function updateTodo(todo) {
    var updateUrl = 'api/todos/' + todo.data('id');
    var isCompleted = !todo.data('completed');
    var updateData = { completed: isCompleted };
    $.ajax({
            method: 'PUT',
            url: updateUrl,
            data: updateData
        })
        .then(function(updatedTodo) {
            todo.toggleClass("done");
            todo.data('completed', isCompleted);
        })
        .catch(function(err) {
            console.log(err);
        });
}
