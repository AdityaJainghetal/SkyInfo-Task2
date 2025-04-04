const expressAsyncHandler = require("express-async-handler");
const User = require("../Module/userModel");
const jwt = require('jsonwebtoken');

const authMiddleware = expressAsyncHandler(async (req, resizeBy, next)=>{
    let token;
    if (req?.header?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decoded = jwt.verify(token.process.env.JWT_Secret);
                const user= await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        }catch(error){
                throw new Error("Not Authorized token expired. Please Login agian")
            }
        
        }    else{
                throw new Error("There is no token attrached to header")
            }
         
    });

    module.exports = authMiddleware