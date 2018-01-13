const mongoose = require('mongoose');
var request = require('request');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/User');

var UserSchema = new mongoose.Schema({
	userID: String,
	name: String,
	email: String,
	avatar: String,
	friends: [{
		name: String,
		id: Number
	}],
	access_token: String,
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

var User = mongoose.model('user', UserSchema);

UserSchema.static.searchByUserIdAndSave = function searchByUserId(userAuth, callback) {
	var user = this;
	user.findOne({userID: userAuth.userID}, (err, userData) => {
		callback(err, userData);
	});
};

module.exports = User;