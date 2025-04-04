const expressAsyncHandler = require("express-async-handler");
const User = require("../Module/userModel");
const jwt = require('jsonwebtoken');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;
    // Check if the Authorization header is present and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                // Correctly verify the token with the secret
                const decoded = jwt.verify(token, process.env.JWT_Secret);
                // Find the user by ID from the decoded token
                const user = await User.findById(decoded.id);
                if (!user) {
                    throw new Error("User  not found");
                }
                req.user = user; // Attach user to request object
                next(); // Proceed to the next middleware or route handler
            } else {
                throw new Error("Token not found");
            }
        } catch (error) {
            throw new Error("Not Authorized: Token expired or invalid. Please log in again.");
        }
    } else {
        throw new Error("There is no token attached to the header");
    }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const adminUser  = await User.findOne({ email });
    if (!adminUser  || adminUser .role !== "admin") {
        throw new Error("You are not an admin");
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };