// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Message = mongoose.model('Message', messageSchema);
// export default Message;
module.exports = Message;
