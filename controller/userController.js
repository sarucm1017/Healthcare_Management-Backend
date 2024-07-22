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

  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({ message: "Email already registered" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { otp, expirationOfOtp } = otpGeneration();


    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      otp,
    });
    sendOTP(user.email, otp);

    console.log("req.session.otp line 67",req.session.otp);
    console.log("user.email line 68",user.email);
    console.log("date now",Date.now());

    return res.status(200).json(otp);
  }
});

// @desc OTP verification
// @route POST /api/users/verify-otp
// @access Public

const otpVerification = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log(`Verifying  OTP: ${otp} and email${email}`);

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    // Validate OTP
    const verifyOtp = await userModel.findOne({ otp });

    if (verifyOtp.otp !== otp) {
      console.log("109", verifyOtp.otp);
      return res.status(400).json({ error: "Invalid OTP usercontroller.113" });
    }

    if (Date.now() - verifyOtp.createdAt > 120000) {

        console.log("otp expired 121",verifyOtp.createdAt);
        console.log("otp expired 122",Date.now() );

      return res.status(400).json({ message: "otp expired" });
    }

    if (otp === verifyOtp.otp) {
      console.log("OTP verified successfully");
      verifyOtp.otp = null;
      await userModel.updateOne({ email }, { $unset: { otp: "" } });

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      console.log("Invalid OTP.135");
      return res.status(400).send("Invalid OTP.136");
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).send("Internal server error");
  }
});

const UserLogin = asyncHandler(async (req, res) => {

  const { email,password } = req.body;
  if(!email || !password) {

    res.status(400);
    throw new Error("Email and password are required");
  } 

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role }, // Include role in token
    process.env.JWT_SECRET, // Your JWT secret
    { expiresIn: '1h' } // Token expiration
  );
  res.status(200).json({
    token,
    role: user.role // Send role back to the client
  });
  
});

module.exports = { userRegister, otpVerification, UserLogin };
