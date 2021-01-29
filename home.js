// eraseDatabaseOnSync at line # 376


// // import express from 'express';
//
// // console.log(`Your port is ${process.env.PORT}`);
// // undefined
// const dotenv = require('dotenv');
// dotenv.config();
//
// const cors = require('cors');
// const bodyParser = require('body-parser');
// console.log(`Your application port is ${process.env.port}`); // 8626
//
// console.log(`Your application's database url: ${process.env.DATABASE_URL}`); // 8626
//
//
// // import { Router } from 'express';
// const Router = require('express');
// const router = Router();
//
// const express = require('express');
// // Express related imports
// // other node package imports
//
//
// const models = require('./src/models/index');
//
// // import models, { connectDb } from './src/models/index';
//
// const connectDb = require('./src/models/connectDb');
//
// const app = express();
// // additional Express stuff: middleware, routes, ...
//
//
// const routes =require('./routes');
// app.use(cors());
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.use(express.json());
//
// app.use(async (req, res, next) => {
//     req.context = {
//         models,
//         me: await models.User.findByLogin('rwieruch'),
//     };
//     next();
// });
//
//
// app.use('./session', routes.session);
// app.use('./users', routes.user);
// app.use('./messages', routes.message);
// const eraseDatabaseOnSync = true;
//
//
// // required for form submission
// app.use(express.urlencoded({extended: false}));
//
//
//
//
// // const user = require ('./routes/user');
//
//
// // app.use(user);
//
//
// // check port at .env file
// // console.log(`Example app listening on port ${process.env.PORT}!`),
// // app.get('/', (req, res) => res.send('Hello World  22 !'));
//
//
//
//
//
// // app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// connectDb().then(async () => {
//     if (eraseDatabaseOnSync) {
//         await Promise.all([
//             models.User.deleteMany({}),
//             models.Message.deleteMany({}),
//         ]);
//
//         createUsersWithMessages();
//     }
//
//     app.listen(process.env.PORT, () =>
//         console.log(`Example app listening on port ${process.env.PORT}!`),
//     );
// });
//
//
// const createUsersWithMessages = async () => {
//     const user1 = new models.User({
//         username: 'rwieruch',
//     });
//
//     const user2 = new models.User({
//         username: 'ddavids',
//     });
//
//     const message1 = new models.Message({
//         text: 'Published the Road to learn React',
//         user: user1.id,
//     });
//
//     const message2 = new models.Message({
//         text: 'Happy to release ...',
//         user: user2.id,
//     });
//     const message3 = new models.Message({
//         text: 'Published a complete ...',
//         user: user2.id,
//     });
//
//
//     await message1.save();
//     await message2.save();
//     await message3.save();
//
//
//
//
//     await user1.save();
//     await user2.save();
// };
//
//
//
//
//
//
// router.get('/', async (req, res) => {
//     const user = await req.context.models.User.findById(
//         req.context.me.id,
//     );
//     return res.send(user);
// });




const dotenv = require('dotenv');
dotenv.config();

// const 'dotenv/config';
const cors =require('cors');
const bodyParser =require('body-parser');
const express = require('express');
const router = express.Router();

const models = require('./src/models/index');
//
// // import models, { connectDb } from './src/models/index';
//
const {connectDb,db} = require('./src/models/connectDb');

// const models, { connectDb } from './models';

const routes =require('./routes/api2');
var cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())

const path =require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// const exphbs  = require('express-handlebars');


// Application-Level Middleware


console.log("_____*****_____db at home.js",db);
// var db = mongoose.connection;
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    // cookie: { secure: true },
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.use(async (req, res, next) => {


    console.log('____________________Cookies: ', req.cookies);
    // console.log('____________________Cookies: ', res.cookies);

    console.log('__Cookies:__FROM THE SERVER___ ', req.cookies);
    console.log('__Cookies:__FROM THE SERVER___ ',req.cookies.cookieUserId);


    // console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    // console.log('Signed Cookies: ', req.signedCookies);
    //var cookie = req.cookies.cookieName;
    //if (cookie != undefined)
    //cookie exist by the name: cookieName
    //{
        // yes, cookie was already present
    //    console.log('cookie exists', cookie);
    //}
    // next(); // <-- important!
    console.log("bb");
    req.context = {
        models,
        // req.cookies
        // try{
        //
        // }
        // catch(){
        //
        // }
        me: await models.User.find({_id:req.cookies.cookieUserId}),

        // rwieruch is username
        // arefinDiabari is username
    };

    // if (!req.session.views) {
    //     req.session.views = {}
    // }
    //
    // // get the url pathname
    // var pathname = parseurl(req).pathname
    //
    // // count the views
    // req.session.views[pathname] = (req.session.views[pathname] || 0) + 1


    next();
});

// Routes

// app.use('/session', routes.session);
// app.use('/users', routes.user);
// app.use('/messages', routes.message);




// router.get('/profile', requiresLogin, function(req, res, next) {
//     //...
//
//     console.log("at ______________________-/profile");
//
//     console.log("req: ",req);
//     console.log("res: ",res);
//     console.log("next ", next);
// });
/*
BOTH OF THEM WORKS 1ST ONE IS WITH MIDDLEWARE AND THE 2ND ONE IS WITHOUT
 MIDDLE WARE
*/
app.get('/dashboard', requiresLogin, function (req, res) {
    res.render('home');
    // res.render('/');
});


// app.use(async (req, res, next) => {
app.get('/profile', requiresLogin, async function ( req, res) {
     // res.render('/profile');

    // res.redirect('/profile');
    //  res.send(req.session.userId);

    console.log("req.session.userId: ",req.session.userId);

    let user = await models.User.find({_id:req.session.userId});
    if( user===null){
        user=await models.User.find({_id:req.cookies.cookieUserId});
    }


    console.log("_user_____in_____home: ", user);

    return res.send('<h1>Name: </h1>' + user[0].username + '<h2>Mail: </h2>' +
        user[0].email + '<br><a type="button" href="/logout">Logout</a>')
    // res.render('profile');

    // return('/profile');

});


// app.use(async (req, res, next) => {




// app.get('/dashboard', function (req, res) {
//     res.render('home');
// });


// app.use('/index', require('./routes/api2/index'));
app.use('/session', require('./routes/api2/session'));
app.use('/users', require('./routes/api2/users'));
app.use('/messages', require('./routes/api2/message'));
app.use('/login', require('./routes/api2/login'));
app.use('/logout',requiresLogin, require('./routes/api2/logout'));
app.use('/profile', require('./routes/api2/profile'));
app.use('/dashboard', require('./routes/api2/dashboard'));





//guard
// let requiresLogin = function(req, res, next) {
//     if (! req.session.userId) {
//         err = new Error("Not authorized");
//         next(err);
//     }
//     return next();
// };
//protected route

//general error handler
// app.use(function (error, req, res, next) {
//     res.locals.error=err; //get error thrown from another-route above
//     res.render("error-page");
// });


function requiresLogin(req, res, next) {
    console.log("_______________________req ",req);
    console.log("______________________res: ",res);
    if (req.session && req.session.userId) {
        // console.log("_______________________req.session: ",req.session);
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}








app.use(express.json());

// required for form submission
app.use(express.urlencoded({extended: false}));
// app.use('/api/members',require('./routes/api/members'))

// Start






const eraseDatabaseOnSync = false;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);

        createUsersWithMessages();
    }

    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});




// console.log("connectDb_connnection__________________________",mongoose.connection);
// connectDb.on('error', console.error.bind(console, 'connection error:'));
// connectDb.once('open', function () {
//     // we're connected!
//     console.log("we're connected!");
// });

// const path =require('path');
// const db = require('./src/models/connectDb');

// express.Router();



// app.set('trust proxy', 1);
// trust first proxy
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))




// parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
    // res.send('<h1>Hello World! %%%%%%</h1>')



    // if(req.cookies.cookieName!==undefined){
    //     console.log("====================== cookie defined =====================================");
    // }
    // cookieName

    // Cookies that have been signed
    // console.log('_______________________________Signed Cookies: ', req.signedCookies)

    res.sendFile(path.join(__dirname,'public/index.html'));
    //  res.sendFile(path.join(__dirname,'public/index.html'));
});


// serve static files from template
// app.use(express.static(__dirname + '/templateLogReg'));



//use sessions for tracking logins
// app.use(session({
//     secret: 'work hard',
//     resave: true,
//     saveUninitialized: false
// }));


// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// define as the last app.use callback
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
// });




const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'arefinDiabari',
        email: "mhmdarefin@gmail.com",
        password:"Tiginor",
        phone:"01911272057",
        profile:"sultanul Arefin_Diabari",
        // profile.name.first:"sultanul",
        // profile.name.last:"arefin",




    });

    const user2 = new models.User({
        username: 'arefinMirpur',
        email: "md.sultanularefin@gmail.com",
        password:"Tiginor",
        phone:"01911272057",
        profile:"sultanul ArefinMirpur",
    });

    const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
    await user2.save();
};
