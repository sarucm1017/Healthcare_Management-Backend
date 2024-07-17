const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

//email

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

//for otp 

const sendOTP = async(email,otp) => {
    const otpmail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const maildata = {
        from : process.env.EMAIL_FROM,
        to : email,
        subject : "OTP for your account",
        text: `your one time password is ${otp}`
    };

    try{
        await otpmail.sendMail(maildata);
        console.log("otp send successfully");
        console.log(maildata);
    }catch(error) {
        console.error(error);
        throw new Error("error sending otp email");
    }
}

module.exports =  {transporter,sendOTP}