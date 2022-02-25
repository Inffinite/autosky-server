const express = require('express')
require('./db/mongoose')
const productRouter = require('./routers/productRouter')
const messageRouter = require('./routers/messageRouter')
const chalk = require('chalk')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())
app.use(productRouter)
app.use(messageRouter)

app.listen(port, () => {
    console.log(chalk.yellow('[+] Server is up on port ' + port))
})
