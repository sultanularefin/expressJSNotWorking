// import mongoose from 'mongoose';
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         unique: true,
//     },
// });
// const User = mongoose.model('User', userSchema);
// export default User;


// import mongoose from 'mongoose';
const bcrypt  = require('bcrypt');
const mongoose  = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        optional: true
    },
    profile: { type: Object },
    'profile.name': { type: Object },
    'profile.name.first': { type: String },
    'profile.name.last': { type: String },
    services: { type: Object, optional: true, blackbox: true },
    roles: { type: Object, optional: true, blackbox: true },

    // your other stuff can go here

    'status': { type: Object, optional: true, blackbox: true }, // to track user, so if away, can logout

    AccessFailedCount:{
        type: Number,
        required:false,
    },
    ConcurrencyStamp:{
        type:String,
        required:false,
    },
    EmailConfirmed:{
        type:Boolean,
        required:false,
    },
    LockoutEnabled:{
        type:Boolean,
        required:false,
    },
    LockoutEnd:{
        type:Date,
        required:false,
    },
    NormalizedEmail:{
        type:String,
        required:false,
    },
    NormalizedUserName:{
        type:String,
        required:false,
    },

    PasswordHash:{
        type:String,
        required:false,
    },PhoneNumberConfirmed:{
        type:Boolean,
        required:false,
    },
    SecurityStamp:{
        type:String,
        required:false,
    },
    TwoFactorEnabled:{
        type:Boolean,
        required:false,
    },
    profile: { type: Object },
    'profile.name': { type: Object },
    'profile.name.first': { type: String },
    'profile.name.last': { type: String },
    roles: { type: Object, blackbox: true, optional: true },
    userEntitySettings: { type: Object, optional: true, blackbox: true },
    userPersonalSettings: { type: Object, optional: true, blackbox: true },
    'status': { type:Object, optional: true, blackbox: true },



});


userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    return user;
};


// if user is deleted then delete all messages for that id
userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
});

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    console.log("next is: ",next);
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});





const User = mongoose.model('User', userSchema);
// export default User;
module.exports = User;
