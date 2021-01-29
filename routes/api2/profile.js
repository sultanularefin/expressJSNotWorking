 const Router = require('express');

// const Router = require('express');
// const path =require('path');
// var User = require('./../src/models/user');
// const bcrypt  = require('bcrypt');

// const mongoose = require('mongoose');

const router = Router();

// const router = Router();
// const router = express.Router();
const User = require('../../src/models/user');

// console.log("________at PROFILE PAGE _______");

// GET route after registering
router.get('/', function (req, res, next) {
    console.log("req.session.userId: ",req.session.userId);
    console.log("req.context.me: ",req.context.me);


    // User.findById(req.context.me._id)

    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                console.log("error is: ___________",error);
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' +
                        user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

module.exports = router;
// export default router;
