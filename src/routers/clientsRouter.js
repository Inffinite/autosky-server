const express = require('express')
const Client = require('../models/client.js')
const router = new express.Router()

router.post('/addClient', async (req, res) => {
    const client = new Client(req.body)

    try{
        await client.save()
        res.status(201).send(client)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/getClients', async (req, res) => {
    try{
        const clients = await Client.find()
        res.status(200).send(clients)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/deleteClient', async (req, res) => {
    try{
        await Client.deleteOne({ _id: req.query.id})
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router