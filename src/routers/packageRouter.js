const express = require('express')
const Package = require('../models/package')
// const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/addPackage', async (req, res) => {
    const package = new Package(req.body)
    console.log(package)

    try{
        await package.save()
        // sendWelcomeEmail(user.email, user.name)
        // const token = await user.generateAuthToken()
        res.status(201).send({ package })
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/getPackages', async (req, res) => {
    try{
        const packages = await Package.find()
        res.status(200).send(packages)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/deletePackage', async (req, res) => {
    try{
        await Package.deleteOne({ _id: req.query.id})
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router