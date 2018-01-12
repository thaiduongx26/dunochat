var express = require('express');
var User = require('./../models/User.js');
var router = express.Router();

router.post('/', (req, res) => {
	var str = req.body.str;
	console.log(str);
	User.find({name: {"$regex": str, "$options": "i"}}).select('-_id name userID').exec((err, data) => {
		if(err) {
			res.status(404).send({
				code: 404,
				message: "Not found"
			});
		} else {
			res.status(200).send({
				code: 200,
				data: data
			});
		}
	});
});

module.exports = router;