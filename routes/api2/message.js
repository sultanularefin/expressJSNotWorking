// import { Router } from 'express';
const Router = require('express');


const router = Router();

console.log("________show all messages_______");
router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.find();
    return res.send(messages);
});
router.get('/:messageId', async (req, res) => {
    console.log("_____request.messageId:______ ",req.params.messageId);
    const message = await req.context.models.Message.findById(
        req.params.messageId,
    );
    return res.send(message);
});
router.post('/', async (req, res) => {
    const message = await req.context.models.Message.create({
        text: req.body.text,
        user: req.context.me.id,

        // CHECK HERE
        // user: req.context.me.id,

    });
    return res.send(message);
});
router.delete('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findById(
        req.params.messageId,
    );
    let result = null;
    if (message) {
        result = await message.remove();
    }
    return res.send(result);
});

module.exports = router;
// export default router;
