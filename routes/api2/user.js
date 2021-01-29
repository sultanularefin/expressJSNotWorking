// /one_user/ not defined , thus will not work, check home .js file
// and below 3 lines
// app.use('/session', require('./routes/session'));
// app.use('/users', require('./routes/users'));
// app.use('/messages', require('./routes/message'));
// import { Router } from 'express';
const Router= require('express');


const router = Router();


router.get('/', async (req, res) => {
    const users = await req.context.models.User.find();
    return res.send(users);
});

//http://localhost:3000/users/5d933b3e0ce46e3c36310d3f
router.get('/:userId', async (req, res) => {

    console.log("aaaa AT routes/user.js/:userId")
    const user = await req.context.models.User.findById(
        req.params.userId,
    );
    return res.send(user);
});


module.exports = router;
// export default router;
