const express = require('express')
const User = require('../models/user.js')
const Gallery = require('../models/gallery.js')
const Phone = require('../models/phone.js')
const bcrypt = require('bcryptjs')
const hashPassword = require('../middleware/hashPassword')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const router = new express.Router()

router.post('/addUser', hashPassword, async (req, res) => {
    const user = new User(req.body)

    try{
        const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/addPhone', auth, async (req, res) => {
    const phone = new Phone(req.body)

    try{
        await user.save()
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/addImage', auth, async (req, res) => {
    const image = new Gallery(req.body)

    try{
        await image.save()
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})


router.get('/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        console.log(token)
        res.send({ user, token })
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/getUsers', async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).send(users)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.status(200).send()
    } catch(e){
        res.status(400).send(e)
    }
})

// delete client
router.get('/deleteUser', async (req, res) => {
    try{
        await User.deleteOne({ _id: req.query.id})
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/deletePhone', auth, async (req, res) => {
    try{
        await Phone.deleteOne({ _id: req.query.id})
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router