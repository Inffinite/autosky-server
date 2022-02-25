const express = require('express')
const Message = require('../models/message.js')
const { checkPassword } = require('../middleware/checks')
const router = new express.Router()

router.post('/addMessage', async (req, res) => {
    const message = new Message(req.body)

    try{
        await message.save()
        res.status(201).send()
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
})

router.get('/getMessages', checkPassword, async (req, res) => {
    try{
        const messages = await Message.find()
        res.status(200).send(messages)
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router