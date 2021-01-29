const express = require('express')

// import express from 'express';
const app = express();


const path =require('path');

const exphbs  = require('express-handlebars');

const members = require('./models/Members');
// BODY PARSER MIDDLEWARE
// post, insert username and email via postman's post method to url
// http://localhost:3001/api/members


app.use(express.json());

// required for form submission
app.use(express.urlencoded({extended: false}));

const logger = require ('./middleware/logger');


// var path = require('path');

app.get('/', (req, res) => {
    console.log("_____at here_____app.get('/', (req, res) => {__________ ")
    // res.send('<h1>Hello World! %%%%%%_____</h1>')

     app.use(express.static(path.join(__dirname,'public')));
    // res.sendFile(path.join(__dirname,'public/index.html'));

    //taxi@taxi-HP-ProBook-4540s:~/DreamHouse/expressJS$
    // npm run start3nodemon
    // run this http://localhost:3001
    // http://localhost:3001/index.html
    //http://localhost:3001/index.html
});

// the first one will execute.
// HOME PAGE ROUTE.
app.get('/', (req, res) =>
        res.render('index',{
        title: 'Members APP 3',
         members:members
        // members
    })

    //app.use(express.static(path.join(__dirname,'public')));
    // res.sendFile(path.join(__dirname,'public/index.html'));
);


app.get('/', (req, res) => {
    //res.send('<h1>Hello World! %%%%%%</h1>')

    app.use(express.static(path.join(__dirname,'public')));
    // res.sendFile(path.join(__dirname,'public/index.html'));
});

app.use('/api/members',require('./routes/api/members'))

// Handebars Middleware.

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.use(logger);
// app.use(logger());



// app.get('/', function (req, res) {
//     res.send('<h1>Hello World!</h1>')
// });



app.post('/', function (req, res) {
    res.send('Got a POST request')
});


app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
});


app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
});



// app.get('/', (req, res) => res.send('Hello World!'));

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
