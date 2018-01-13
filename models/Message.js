var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Message');

var MessageSchema = new mongoose.Schema({
	idSender: Schema.Types.ObjectId,
	idReceiver: Schema.Types.ObjectId,
	count: Number,
	messages: [{
		text: String,
		type: String,
		read: Boolean,
		stt: Number,
		idSender: Schema.Types.ObjectId,
		time: Number
	}]
});
var Message = mongoose.models('message', MessageSchema);
module.exports = Message;