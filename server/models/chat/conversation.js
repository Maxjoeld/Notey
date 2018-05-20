const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  recipient: {
    type: String
  },
  initiator: {
    type: String
  },
});

module.exports = mongoose.model('Conversation', ConversationSchema);
