var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var request = require('request');
// var getDataByToken = require('./FB-methods/fb-methods.js').getDataByToken;
var socket = require('socket.io');
var loginRouter = require('./services/login.js');
var searchRouter = require('./services/search.js')

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));

app.use('/login', loginRouter);
app.use('/search', searchRouter);

app.get('/', (req, res) => {
	console.log(req.header("Cookie"));
	// if(!req.header("Cookie")){
		res.sendFile(__dirname + '/views/index.html');
	// }else{
	// 	res.sendFile(__dirname + '/views/index2.html');
	// }
});


// console.log(str2.includes(str1));


app.listen(3000, (err) => {
	console.log("Server started");
});