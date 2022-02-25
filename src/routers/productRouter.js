const express = require('express')
const { checkPassword } = require('../middleware/checks')
const Product = require('../models/products.js')
const router = new express.Router()

router.post('/addProduct', checkPassword, async (req, res) => {
    const product = new Product(req.body)

    try{
        await product.save()
        res.status(201).send()
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/getProducts', async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).send(products)
    } catch(e){
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router