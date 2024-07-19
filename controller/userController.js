
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userRegisterModel");
const { sendOTP } = require("../config/emailValidation");
const session = require("express-session");

// OTP generation
function otpGeneration() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationOfOtp = Date.now() + 2 * 60 * 1000; // 2 minutes expiration time
    return { otp, expirationOfOtp };
}

// @desc Registration 
// @route POST /api/users/register
// @access Public
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await userModel.findOne({email});
    if (userAvailable) {
        return res.status(400).json({ message: "Email already registered" });
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);

    const { otp, expirationOfOtp } = otpGeneration();
    req.session.signupData = { name, email, password: hashedPassword, otp, expirationOfOtp }

    console.log(req.sessionID)
    console.log(req.session.signupData);
    try {
        await sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP" });
    }

    }

});

// @desc OTP verification 
// @route POST /api/users/verify-otp
// @access Public


const otpVerification = asyncHandler(async(req,res) => {

    const { otp }  =req.body;
   
    console.log("Received OTP data:", req.body); // Add this log
    console.log("Session data during OTP verification:", req.session.signupData);

    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }

    if(!req.session.signupData){
        return res.status(400).json({message:"Please sign up first" })
    }
    console.log(req.sessionID)
    console.log(req.session.signupData);
    const { otp: generatedOtp, expirationOfOtp } = req.session.signupData;
    // const { name, email, password, otp: generatedOtp, expirationOfOtp} = req.session.signupData;
    console.log(req.session.signupData);
     
    if(Date.now() > expirationOfOtp)  {
        delete req.session.signupData;
        return res.status(400).json({ message: "OTP has expired" });

    }
    if (otp === generatedOtp) {
        console.log(req.session.signupData);
        try {
            const user = await userModel.create({ name, email, password });
            delete req.session.signupData;

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            return res.status(200).json({ token, message: "Registration successful" });
        } catch (error) {
            console.error("Error creating user:", error); // Add this log
            return res.status(500).json({ message: "Error creating user" });
        }
    } else {
        return res.status(400).json({ message: "Incorrect OTP" });
    }
});

const Login = asyncHandler(async (req, res) => {
    // Implement login functionality here
});

module.exports = { userRegister, otpVerification, Login };
