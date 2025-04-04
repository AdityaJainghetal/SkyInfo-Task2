const jwt = require("jsonwebtoken");


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_Secret,{expiresIn:"7days"})
}

module.exports = {generateToken};