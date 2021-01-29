// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const User = require('./user');
// import User from './user';
const Message = require('./message');
// import Message from './message';


const models = {User, Message };
// export default models;
module.exports = models;
// module.exports = connectDb;


