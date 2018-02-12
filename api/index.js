var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');

var toDoRoutes = require('./routes/todos');

app.use(bodyParser.json()); // to handle that data coming in Express doesnt give access to it automatically
app.use(bodyParser.urlencoded({ extended: true })); // this two lines: allow us to access the req.body that commes in a POST or a PUT req
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views')); // referencing directory

app.get('/', function(req, res) {
    res.sendFile("index.html");
});

app.use('/api/todos', toDoRoutes);

app.listen(port, function(){
	console.log("APP IS RUNNNING ON PORT: "+port);
});
