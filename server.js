const port = 3001;
const express = require('express');

const fileUpload = require('express-fileupload');

// import express from 'express';
const app = express();

app.use(fileUpload());



const path =require('path');


app.use(express.json());

// required for form submission
app.use(express.urlencoded({extended: false}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/', function(req, res, next) {
//     res.render('http://localhost:3002');
//
//     // Handle the get for this route
// });

app.post('/', function(req, res, next) {
    // Handle the post for this route
});



app.get('/', (req, res) => {
    // res.send('<h1>Hello World!222</h1>')

    // http://localhost:3001/index.html
    // working on --> taxi@taxi-HP-ProBook-4540s:~/DreamHouse/expressJS$
    // npm run dev3

    // app.use(express.static(path.join(__dirname,'public')));
    app.use(express.static(path.join(__dirname,'client2')));
    // res.sendFile(path.join(__dirname,'public/index.html'));
});

app.post('/upload', (req, res) => {
        if( req.files === null){
            return res.status(400).json({msg: "No file uploaded"});
        }
        else {
            const file = req.files.file;

            file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }

                    res.json({fileName: file.name, filePath: `/uploads/${file.name}`}
                    );
                }
            );
        }

    }
);

// the first one will execute.
// HOME PAGE ROUTE.
// app.get('/', (req, res) =>
//         res.render('index',{
//             title: 'Members APP 3',
//             members:members
//             // members
//         })
//
//     //app.use(express.static(path.join(__dirname,'public')));
//     // res.sendFile(path.join(__dirname,'public/index.html'));
// );


// app.get('/', (req, res) => {
//     //res.send('<h1>Hello World! %%%%%%</h1>')
//
//     app.use(express.static(path.join(__dirname,'public')));
//     // res.sendFile(path.join(__dirname,'public/index.html'));
// });
//
// app.use('/api/members',require('./routes/api/members'))




app.listen(port, () => console.log(`Example app listening on port ${port}!`));
