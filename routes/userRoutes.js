const express = require("express");
const router = express.Router();
const {userRegister, otpVerification, Login} = require("../controller/userController");


router.route("/register").post(userRegister);
router.route("/verify-otp").post(otpVerification);
router.route("/login").post(Login)













module.exports = router;