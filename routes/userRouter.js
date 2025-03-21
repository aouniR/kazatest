const express = require('express')
require('dotenv').config()
const { updateUser } = require('../models/userModel')
const userRouter=express.Router()

//update user # Res body 
userRouter.post('/api/v1/users/update', async (req, res) => {
    if ( !req.body.username ) {
        return res.status(400).send("username is required.")
      }

    try {
        await updateUser(req.body.username, req.body.updates)
        res.setHeader('content-type', 'application/json')
        res.status(200).send("user updated!")
    } catch (err) {
        console.error("Error updating user:", err)
        res.status(400).send("Error updating user")
    }
})


module.exports= userRouter 
