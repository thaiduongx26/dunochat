var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	idSender: Schema.Types.ObjectId,
	idReceiver: Schema.Types.ObjectId,
	messages: [{
		text: String,
		type: String,
		idSender: Schema.Types.ObjectId,
		time: Number
	}]
});

var Message = mongoose.models('message', MessageSchema);

module.exports = Message;