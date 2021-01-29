// import { Router } from 'express';
const Router = require('express');
const path =require('path');
// var User = require('./../src/models/user');
// const bcrypt  = require('bcrypt');



const router = Router();




router.get('/', async (req, res) => {
    // const messages = await req.context.models.Message.find();
    // return res.send(messages);


    if (req.session) {
        console.log("Req.session: ",req.session);
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                console.log("____error__________at_____logout___:");
                return next(err);
            } else {
                console.log("____else_of_______session.destroy_______AT__LOGOUT____:");
                res.clearCookie('cookieUserId');
                return next();
                // return res.redirect('/');
                // return res.redirect('https://www.npmjs.com/package/express-session');
            }
        });
    }


    // app.get('/clear_cookie_foo', function(req, res){
    //     res.clearCookie('foo');
    //     res.send('cookie foo cleared');
    // });

    console.log("req.session:",(req.session===true));
    return res.redirect('/login');
    // res.sendFile(path.join(__dirname,'./../public/index.html'));
// const messages = await req.context.models.Message.find();
// return res.send(messages);
});

module.exports = router;
// export default router;


