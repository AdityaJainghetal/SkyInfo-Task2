const mongoose = require('mongoose');
const bcrypt = require("bcrypt"); // Corrected the variable name
// const { ObjectId } = mongoose.Schema; // Import ObjectId from mongoose

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: true 
});

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified('password')) { // Only hash the password if it has been modified
            const salt = await bcrypt.genSalt(10); // Use bcrypt instead of bcrpt
            this.password = await bcrypt.hash(this.password, salt);
        }
        next(); // Call next() to proceed to the next middleware
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Method to compare passwords
userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password); // Use bcrypt instead of bcrpt
};

const User = mongoose.model('User ', userSchema); // Removed the extra space

module.exports = User;