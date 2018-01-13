var express = require('express');
var User = require('./../models/User.js');
var getDataByToken = require('./../FB-methods/fb-methods.js').getDataByToken;
var isAuth = require('./../services/authenticate.js').isAuth;
var jwt = require('jsonwebtoken');
var privateKey = require('./../config.js').tokenKey;

var router = express.Router();

router.post('/', (req, res) => {
	// console.log(req.body);
	var access_token = req.body.accessToken;
	var userID = req.body.userID;
	if(!access_token || !userID) {
		res.status(401).send({
			code: 401,
			message:"Unauthorized"
		});
	}

	getDataByToken(access_token, (err, resfb, bodyfb) => {
		var body = JSON.parse(bodyfb);
		// console.log(body);
		if(err || (resfb.statusCode != 200) || userID != body.id){
			// console.log(body.id);
			res.status(401).send({
				code: 401,
				message:"Unauthorized"
			});
		} else {
			// console.log(body.email)
			User.findOne({
				userID: body.id,
				email: body.email
			}, (err, data) => {
				if(err) {
					console.log(err);
					res.status(401).send({
						code: 401,
						message:"Unauthorized"
					});
				} else {
					if(!data) {
						var newUser = new User({
							name: body.name,
							userID: body.id,
							access_token: access_token,
							tokens: [{
								token: newToken
							}],
							email: body.email,
							avatar: body.picture.data.url
						});
						
						newUser.save((err) => {
							if(err) {
								console.log(err);
								res.status(401).send({
									code: 401,
									message:"Unauthorized"
								});
							}else{
								var newToken = jwt.sign({
									id: newUser._id,
									userID: body.id,
									email: body.email,
									date: Date.now()
								}, privateKey);
								res.header("Set-Cookie", newToken).status(200).send({
									code:200,
									id: newUser._id,
									message: "Success",
									token: newToken
								});
							}
						})
						
					} else {
						User.update(data, {$push: {tokens: {token: newToken}}, name: body.name, access_token: access_token, avatar: body.picture.data.url}, (err, raw) => {
							if(err) {
								res.status(401).send({
									code: 401,
									message:"Unauthorized"
								});
							} else {
								var newToken = jwt.sign({
									id: newUser._id,
									userID: body.id,
									email: body.email,
									date: Date.now()
								}, privateKey);
								res.header("Set-Cookie", newToken).status(200).send({
									code:200,
									id: data._id,
									message: "Success",
									token: newToken
								});
							}
						});
					}
				}
			})


		}

		
		
	})
});

module.exports = router;