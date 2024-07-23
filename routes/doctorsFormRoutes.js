const express = require("express");
const router = express.Router();    
const {newDoctor} = require("../controller/DoctorsFormController");


router.route("/forms").post(newDoctor);



module.exports =router;