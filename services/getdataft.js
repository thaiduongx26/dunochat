var express = require('express');
var isAuth = require('./authenticate.js').isAuth;
var Message = require('./../models/Message.js');
var router = express.Router();

router.get('/', isAuth, (req, res) => {
	
})

module.exports = router