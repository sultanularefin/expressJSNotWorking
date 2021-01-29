var express = require('express');
var router = express.Router();
var User = require('../../src/models/user');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });






router.get('/', async (req, res) => {
  console.log("users at routes: ");
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {

  console.log("at here http://localhost:3000/users/5d933cdf578af03e136938f2");
  console.log("does the id changes every time: http://localhost:3000/users/5d933d12f140eb3e82533ff4");

  console.log("request.userid: ",req.params.userId);
  const user = await req.context.models.User.findById(
      req.params.userId,
  );
  return res.send(user);
});

router.post('/', async (req, res) => {

  // console.log("_____request:______ ",req.params);
  console.log("_____request:______ ",req.body.email);
  console.log("_____request:______ ",req.body.username);
  console.log("_____request:______ ",req.body.password);
  console.log("_____request:______ ",req.body.phone);
  console.log("_____request:______ ",req.body.passwordConf);


  if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.phone &&
      req.body.passwordConf) {


    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
    };


    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.send(userData);
        // return res.redirect('/profile');
      }
    });
  }


  // const message = await req.context.models.Message.create({
  //   text: req.body.text,
  //   user: req.context.me.id,
  // });
  // return res.send(message);
});

module.exports = router;
