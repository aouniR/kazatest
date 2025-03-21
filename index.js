const express = require('express')
const app = express()
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const {isAuthenticated} = require('./middlewares/authentication')

app.use(express.json())
app.use(authRouter)
app.use(isAuthenticated,userRouter)

module.exports = app