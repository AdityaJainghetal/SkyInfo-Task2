const { TokenExpiredError } = require("jsonwebtoken");
const User = require("../Module/userModel");
const asyncHandler = require('express-async-handler');
const { generateToken } = require("./jwtToken");

// Correctly use asyncHandler as a function
const createUser  = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser  = await User.findOne({ email: email });
    
    if (!findUser ) {
        const NewUser  = await User.create(req.body);
        res.json(NewUser );
    } else {
        res.json({
            msg: "NewUser  already exists",
            success: false,
        });
    }

});
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    // Find the user by email
    const findUser  = await User.findOne({ email });

    // Check if user exists and if the password matches
    if (findUser  && await findUser .isPasswordMatched(password)) {
        res.json({
            id: findUser ._id,
            firstname: findUser .firstName, // Assuming you meant firstName instead of lastName
            email: findUser .email,
            token: generateToken(findUser ._id),  
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

const getallUser = asyncHandler (async (req,res)=>{
    try {
        const getUser = await  User.find(); 
        res.json(getUser);
    } catch (error) {
        console.log(error);
    }
})

const getUser = asyncHandler(async (req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    try {
        const getUser = await User.findById(id);
        res.json({
            getUser,
        })
        
    } catch (error) {
        throw new Error (error);
    }
})



const deleteaUser = asyncHandler(async (req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
        
    } catch (error) {
        throw new Error (error);
    }
})


const updateUser = asyncHandler(async(req,res)=>{
    console.log(req.user);
    const {id} = req.params;
    try{
        const updateUser = await User.findByIdAndUpdate(
            id,{
            
            firstname: req?.body?.firstName,
            lastname: req?.body?.lastName,

            email: req?.body?.email,

            // firstname: req.body.firstname

        },
        {
            new: true,
        }
    );
    res.json(updateUser);
}catch(error){
        throw new Error(error);
    }
       

    
})

module.exports = { createUser ,loginUserCtrl, getallUser , getUser, deleteaUser, updateUser};