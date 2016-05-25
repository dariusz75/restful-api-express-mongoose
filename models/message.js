var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  message: {
    type: String,
    required: true
  }

}, { collection: 'messages' });

module.exports = mongoose.model('Message', messageSchema);
