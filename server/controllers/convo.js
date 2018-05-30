const Conversation = require('../models/chat/conversation'),  
      Message = require('../models/chat/message'),
      User = require('../models/users'),
      { sendUserError } = require('../utils/authenticate');


const getContact = (req, res) => {
  const { username } = req.body;
  User.findOne({ username: username })
    .then(foundUser => res.status(201).send(foundUser))
    .catch(err => res.status(400).send({ err }));
};

const allContacts = (req, res) => {
  User.find({})
    .then(allUsers => res.status(201).send(allUsers))
    .catch(err => res.status(400).send({ error: err }));
};

const getConversations = (req,res) => {
  // Only return one message from each conversation to display as snippet
  // res.json('helllo');
  Conversation.find({ participants: req.session.user })
  .select('_id')
  .then((conversations) => {
    
    // Set up empty array to hold conversations + most recent message

    let fullConversations = [];
    conversations.forEach(conversation => {
      Message.find({ 'conversationId': conversation._id })
        .sort('-createdAt')
        // This is loading just one message from the conversation to load, like whatsapp and fb does 
        // if the id is not the current user, don't limit it keep searching for the r
        .limit(1)
        .populate({
          path: "author",
          select: "profile.firstName profile.lastName"
        })
        .then(message => {
          fullConversations.push(...message);
          if (fullConversations.length === conversations.length) {
            return res.status(200).json({ conversations: fullConversations });
          }
        }).catch(err => sendUserError(err, res));
    });
  })
  .catch(err => sendUserError(err,res));
};

const getConversation = (req, res) => {
  Message.find({ conversationId: req.params.conversationId })
  .select('createdAt body author')
  .sort('createdAt')
  .populate({
    path: 'author',
    select: 'profile.firstName profile.lastName'
  })
  .then(messages => res.status(200).json({ conversation: messages }))
  .catch(err => sendUserError(err, res));
}

const newConversation = (req, res, next) => {
  const { recipient } = req.params;
  const { composedMessage } = req.body;
  const { user } = req.session;
  if (!recipient) {
    sendUserError('Please choose a valid recipient for your message.', res);
  }
  // check if conversation already exist
  // Conversation.find({ i: req.session.user })
  // .select('participants')
  // .then((conversations) => {
  //   convos.forEach((id => {
  //     console.log({ loop: id });
  //     if (id._id === req.params.recipient) {
  //       console.log('userError')
  //     } 
  //   }))
  // }).catch(err => sendUserError(err,res));
  // if (!composedMessage) {
  //   return sendUserError('Please enter a message.', res);
  // }

  User.findOne({ _id: recipient})
  .then(reci => {
    let recipientName = reci.profile.firstName + " " + reci.profile.lastName;
    User.findOne({ _id: user})
    .then((newuse) => {
      let initiator = newuse.profile.firstName + " " + newuse.profile.lastName;

      const conversation = new Conversation({
        participants: [user, recipient],
        initiator: initiator,
        recipient: recipientName
      });
  
      conversation.save()
        .then(newConversation => {
          res.status(200).json({ message: 'Conversation started', conversationId: conversation._id }); 
          // const message = new Message({
          //   conversationId: newConversation._id,
          //   body: composedMessage,
          //   author: user,
          // });
        
          // message.save() 
          //   .then(() => {
          //    
          //   }).catch(err => sendUserError(err,res));
        })
        .catch(err => sendUserError(err, res));
    }).catch(err => console.log(err))
  })
.catch(err => console.log(err));
  
};

const loadDataTemporarily = (req,res) => {
  
};

const sendReply = (req, res, next) => {
  console.log(req.body.message);
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.message,
    author: req.session.user
  })
  reply.save()
    .then(() => res.status(200).json({ message: 'Reply successfully sent!'}))
    .catch((err) => sendUserError(err, res));
};

const deleteConversation = (req, res, next) => {
  Conversation.findOneAndRemove({
    $and : [
            { '_id': req.params.conversationId }, { 'participants': req.user._id }
           ]}, function(err) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Conversation removed!' });
        return next();
  });
}



module.exports = {
  getContact,
  allContacts,
  getConversations,
  getConversation,
  newConversation,
  sendReply,
  deleteConversation,
};