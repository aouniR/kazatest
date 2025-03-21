const JWT = require('jsonwebtoken')
const ms = require('ms')
const generateToken = (user,JWT_SECRET)=>{
    let payload={
        id : user._id,
        username : user.username,
    }
    return JWT.sign(payload,JWT_SECRET)
}
const verifyToken = (token,JWT_SECRET)=>{
    return JWT.verify(token,JWT_SECRET)
}
module.exports= {generateToken,verifyToken}