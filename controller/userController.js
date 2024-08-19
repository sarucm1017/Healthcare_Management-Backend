const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userRegisterModel");
const { sendOTP } = require("../config/emailValidation");
const session = require("express-session");
const doctorModel = require("../models/DoctorsFormModel");
const patientModel = require("../models/PatientFormModel");

// OTP generation
function otpGeneration() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationOfOtp = Date.now() + 2 * 60 * 1000; // 2 minutes expiration time
  return { otp, expirationOfOtp };
}

// @desc Registration function
// @route POST /api/users/register
// @access Public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  console.log("Registering user with role:", role);
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }
  console.log(req.body);
  console.log("Registering user with role:", role);

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
      role,
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


//////////

const getUserByEmail = asyncHandler(async (req, res) => {
  const { userEmail } = req.params;
  try {
    const user = await userModel.findOne({  email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


///////////////

const UserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
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
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } 
  );

  let roleSpecificId = null;

  if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId: user._id });
      if (doctor) {
          roleSpecificId = doctor._id;
      }
  } else if (user.role === "patient") {
      const patient = await patientModel.findOne({ userId: user._id });
      if (patient) {
          roleSpecificId = patient._id;
      }
  }

  res.status(200).json({
    token,
    email: user.email,
    role: user.role,
    userId: user._id,
    data:user,
    roleSpecificId,
  });
});


////////////////////getpatient or doctor id///////////


const getDoctorOrPatientId = asyncHandler(async (req, res) => {
  const { userId, role } = req.params;

  let id = null;

  if (role === "doctor") {
      const doctor = await doctorModel.findOne({ userId });
      if (doctor) {
          id = doctor._id;
      }
  } else if (role === "patient") {
      const patient = await patientModel.findOne({ userId });
      if (patient) {
          id = patient._id;
      }
  }

  if (!id) {
      return res.status(404).json({ message: "User ID not found in the role's collection" });
  }

  res.json({ id });
});


module.exports = { userRegister, otpVerification, UserLogin, getUserByEmail,  getDoctorOrPatientId };
