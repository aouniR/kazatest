const jwt = require('../security/jwt')
require('dotenv').config()

const isAuthenticated = (req,res,next)=>{
    if(req.headers.authorization==undefined){
        console.log(req.headers)
        res.status(401).send("Authorization token is required")  
    }
    else{
        if(jwt.verifyToken(req.headers.authorization,process.env.JWT_SECRET_Access)){
        next()
        }else {
            res.status(403).send("Invalid or expired token")
        }
    }
}

module.exports = {isAuthenticated}