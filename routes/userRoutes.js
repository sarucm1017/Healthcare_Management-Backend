const express = require("express");
const router = express.Router();
const {userRegister, otpVerification, UserLogin} = require("../controller/userController");


router.route("/register").post(userRegister);
router.route("/otpVerify").post(otpVerification);
router.route("/userlogin").post(UserLogin)








module.exports = router;