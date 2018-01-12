var request = require('request');

var getDataByToken = function (tokenid, callback){
	request({
		url: 'https://graph.facebook.com/v2.11/me?fields=id,name,email,picture',
		method: 'GET',
		qs: {
			'access_token': tokenid
		}
	}, function (err, res, body) {
		callback(err, res, body);
		// console.log("image: " + body)
	});
}

module.exports = {
	getDataByToken
}