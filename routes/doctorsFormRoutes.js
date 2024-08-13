const express = require("express");
const router = express.Router();    
const {newDoctor, getDoctorById} = require("../controller/DoctorsFormController");
const { getAllDoctors } = require("../controller/Doctors/DoctorsController");


router.route("/forms").post(newDoctor);
router.route("/forms").get(getAllDoctors);
router.route("/:userId").get(getDoctorById);



module.exports =router;