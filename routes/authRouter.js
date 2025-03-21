const express = require('express')
require('dotenv').config()
const {hashpass, verifyPassword} = require('../security/hashpass')
const { createUser, getUserByUsername } = require('../models/userModel');
const jwt = require('../security/jwt')
const authRouter=express.Router()

//Add new user # Res body / Code = User /201 Error /400 # Req body = User
authRouter.post('/api/v1/auth/signup', async (req, res) => {
  try {
    if (!req.body.email || !req.body.username || !req.body.fullname || !req.body.password) {
      return res.status(400).send("All fields (email, username, fullname, password) are required.")
    }
    if (req.body.password.length < 8 || req.body.password.length > 20) {
      return res.status(400).send("Password must be between 8 and 20 characters.")
    }
    let { salt, hashedPassword } = await hashpass(req.body.password)
    const user = {
      email: req.body.email,
      username: req.body.username,
      fullname: req.body.fullname,
      password: { "salt": salt, "hashedPassword": hashedPassword } 
    };
    const newUser = await createUser(user)
    res.setHeader('content-type', 'application/json');
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error adding new user:", err);
    res.status(400).send("Error adding new user");
  }
});

//Authenticate user POST /api/v1/auth/login Credentials JWT /200 Error /404/400/500
authRouter.post('/api/v1/auth/login', async (req, res) => {
  try {
    if ( !req.body.username || !req.body.password) {
      return res.status(400).send("All fields (username, password) are required.")
    }
    const user = await getUserByUsername(req.body.username)
    if (!user) {
      return res.status(404).send("User not found")
    }
    const passwordData = typeof user.password === "string" ? JSON.parse(user.password) : user.password
    const { salt, hashedPassword } = passwordData

    if (!salt || !hashedPassword) {
      throw new Error("Invalid password data")
    }

    const isPasswordValid = await verifyPassword(req.body.password, salt , hashedPassword)
    if (!isPasswordValid) {
      return res.status(400).send("Wrong Password")
    }

    const token = jwt.generateToken(user, process.env.JWT_SECRET_Access)
    res.status(200).send({ token })
  } catch (err) {
    console.error("Error during login:", err)
    res.status(500).send("Internal Server Error")
  }
});

module.exports= authRouter  