// import { Router } from 'express';

const express = require('express');
const router = express.Router();

let user;
router.get('/', async (req, res) => {

    console.log("bb");
    console.log("http://localhost:3000/session/");
    // const users = await req.context.models.User.find();

    // User.findOne({ email: email });
    try {
        // adddlert("Welcome guest!");
        // req.context.me= userFind[0]._id;
        // req.session.userId = userFind[0]._id;
        // const users = await req.context.models.User.findOne({_id:req.context.me._id});
        console.log("req.session.userId: ",req.session.userId);
        // console.log("req.cookies.cookieUserId: ",req.cookies.cookieUserId);
        user = await req.context.models.User.findOne({_id:req.session.userId});
        // users = await req.context.models.User.find({_id:req.session.userId});

        console.log("users by session_userId: ",user);


        if(user===null) {
            user = await req.context.models.User.findOne({_id:req.cookies.cookieUserId});

            if(user!==null){

                req.session.userId = user._id;
            }
        }
    }
    catch(err) {
        return res.send("no users found in session");
        // document.getElementById("demo").innerHTML = err.message;
    }




    // User.findOne({ email: email });
    console.log("_____users:_____ ",user);
    return res.send(user);
});

router.get('/:userId', async (req, res) => {
    console.log("aa___ only one user by userId e.g.(___http://localhost:3000/session/5d936dbd54b2ee63a3f444e2___");
    const user = await req.context.models.User.findById(
        req.params.userId,
    );
    return res.send(user);
});

module.exports = router;


// const mongoose = require('mongoose');
// const connectDb = () => {
//     return mongoose.connect(process.env.DATABASE_URL);
// };
//
// module.exports = router;
// export default connectDb;

