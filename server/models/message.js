const mongoose = require('mongoose');

const { Schema } = mongoose;


const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      type: String,
    },
    initiator: {
      type: String,
    },
  },
  {
    timestamps: true, // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  },
);

module.exports = mongoose.model('Message', MessageSchema);
