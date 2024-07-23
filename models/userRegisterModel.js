
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add the email id"],
        unique: [true, "Email id already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    },
    otp: {
        type: String,
        required: false
    },
    otpExpiration: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
