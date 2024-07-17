const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userRegisterModel");
const { sendOTP } = require("../config/emailValidation");




//otpp generation

function otpGeneration(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationOfOtp = Date.now() + 2* 60 * 1000;

    return {otp, expirationOfOtp};
}

// @descr registratioin 
// @route POST /api/users/register
// @access Public

const userRegister = asyncHandler( async (req,res) => {
    const { name,email,password } = req.body ;
    console.log(req.body);

    if(!name || !email ||!password){
        res.status(400);
        throw new Error("all fields are required");
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const { otp, expirationOfOtp } = otpGeneration();

   

  
    try {
        
        await sendOTP(email, otp);
        res.status(200).send('OTP sent to your email');
        const user = new userModel({ email, password: hashedpassword, otp});
        await user.save();

    } catch (error) {

        res.status(500).send("error sending Otp");
        
    }
})

const otpVerification = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`); // Added logging

    try {
        const user = await userModel.findOne({ email });
        
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        // Optional: Check if OTP has expired
        if (user.otpExpiration && Date.now() > user.otpExpiration) {
            console.log("OTP has expired");
            return res.status(400).send("OTP has expired");
        }

        console.log("Stored OTP:", user.otp);
        console.log("Provided OTP:", otp);

        if (user.otp === otp) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            console.log("OTP verified successfully");
            return res.status(200).json({ token });
        } else {
            console.log("Invalid OTP");
            return res.status(400).send("Invalid OTP");
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send("Internal server error");
    }
});

const Login = asyncHandler( async (req,res) =>  {

})

module.exports = {userRegister, otpVerification, Login}