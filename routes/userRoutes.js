const express = require("express");
const router = express.Router();
const {userRegister, otpVerification, UserLogin, getUserByEmail} = require("../controller/userController");


router.route("/register").post(userRegister);
router.route("/otpVerify").post(otpVerification);
router.route("/userlogin").post(UserLogin);
router.route('/:email').get(getUserByEmail);









module.exports = router;