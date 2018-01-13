var jwt = require('jsonwebtoken');
var privateKey = require('./../config.js').tokenKey;
var isAuth = function(req, res, next) {
	var token;
	if(!req.header("Cookie") && !req.header("X-Auth")) {
		res.status(400).send({
			code: 400,
			message:"bad request"
		});
	}
	if(req.header("USER_AGENT")){
		token = req.header("Cookie");
	} else {
		token = req.header("X-Auth");
	}
	jwt.verify(token, privateKey, (err, data) => {
		if (err) {
			res.status(401).send({
				code: 401,
				message: "Unauthorized"
			});	
		} else {
			if (data) {
				if (!User.findOne({
					userId: data.userId,
					"tokens.token": token
				})) {
					res.status(401).send({
						code: 401,
						message: "Unauthorized"
					});
				} else {
					next();
				}
			} else {
				res.status(401).send({
					code: 401,
					message: "Unauthorized"
				});
			}
		}
	});	
};

module.exports = {
	isAuth
}