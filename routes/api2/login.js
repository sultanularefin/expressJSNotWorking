// import { Router } from 'express';
const Router = require('express');
const path =require('path');
// var User = require('./../src/models/user');
const bcrypt  = require('bcrypt');

// const mongoose = require('mongoose');

const router = Router();

console.log("________show all messages_______");
router.get('/', async (req, res) => {

    res.sendFile(path.join(__dirname,'./../../client3/index.html'));
    // const messages = await req.context.models.Message.find();
    // return res.send(messages);
});

router.post('/', async (req, res) => {

    /*
    THIS WORKS
    const users = await req.context.models.User.find();
    return res.send(users);

     */

    /*
     THIS WORKED
     let id= '5d984dc6f2cab719ca55abe4';
     const userFind = await req.context.models.Message.findById(
         id,
     );
     return res.send(message);

     */

    // const User = mongoose.model('User', userSchema);
    // var Person = mongoose.model('User', userSchema);

    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    // User.findOne({ 'email': 'mhmdarefin@gmail.com' }, 'username phone', function (err, User) {
    //     if (err) return handleError(err);
    //     // Prints "Space Ghost is a talk show host".
    //     console.log('person.username: %s person.phone: %s.', User.username, User.phone,
    //     );
    // });



    // THIS WORKS TOO.
    /*
        const user = await req.context.models.User.findById(
            // req.params.userId,
            "5d984dc6f2cab719ca55abe2",
        );

        */


    // User.findOne({ email: email });
    const user1 = await req.context.models.User.find().where({email:"mhmdarefin@gmail.com"}
        // req.params.userId,
        // "5d984dc6f2cab719ca55abe2",
    );

    const user2 = await req.context.models.User.find().where({email:"md.sultanularefin@gmail.com"}
        // req.params.userId,
        // "5d984dc6f2cab719ca55abe2",
    );

    const user3 = await req.context.models.User.find().where({email:"sadiaafrinuiu@gmail.com"}
        // req.params.userId,
        // "5d984dc6f2cab719ca55abe2",

    );

    console.log("username (email) in body request: ",req.body.username);
    let userFind = await req.context.models.User.find().where({email:req.body.username}
        // req.params.userId,
        // "5d984dc6f2cab719ca55abe2",
    );
    // mhmdarefin@gmail.com

    console.log("userFind: ",userFind);

    let pass2 = req.body;
    // let pass3 = req.params;

    console.log("____________pass2: ",pass2);
    // console.log("_____________pass3: ",pass3);
    let pass=req.body.password;
    console.log("user1: ",user1);
    console.log("password: ",user1[0].password);
    // const match = await bcrypt.compare(pass, user3[0].password);

    console.log("pass: ",pass);
    console.log("userFind: ",userFind);

    const match = await bcrypt.compare(pass, userFind[0].password);



    if(match) {
        console.log("Match");

        console.log("userFind[0] at Match block",userFind[0]);

        req.context.me= userFind[0]._id;
        req.session.userId = userFind[0]._id;

        // req => from browser to server
        var cookie = req.cookies.cookieUserId;
        if (cookie === undefined)
        {
            // no: set a new cookie
            // var randomNumber=Math.random().toString();
            // randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('cookieUserId',userFind[0]._id, { maxAge: 900000, httpOnly: true });

            //res.cookie(name2, 'value2', {maxAge: 360000});
            //res.cookie(name, 'value', {expire: 360000 + Date.now()});
            //res.cookie('name', 'express').send('cookie set'); //Sets name = express


            console.log('cookie created successfully');
        }
        else
        {
            // yes, cookie was already present
            console.log('cookie exists', cookie);
        }
        // next(); // <-- important!
        return res.redirect('/profile');

        //login
    }
    else{
        console.log("Didn't match");
    }



    //console.log("user3: ",user3);
    //let pass= 'Tiginor';





    let merged =  [...user1, ...user2, ...user3];

    // User.find().where({ name: 'vonderful' })

    // const user = await req.context.models.User.findBOne(
    //
    //     // req.params.userId,return res.send(userFind);
    // );
    // return res.send(merged);



    return res.send(userFind[0]);
});

module.exports = router;
// export default router;
