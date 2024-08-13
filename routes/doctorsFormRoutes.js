const express = require("express");
const router = express.Router();    
const {newDoctor, getDoctorById, getDoctorDetailsById} = require("../controller/DoctorsFormController");
const { getAllDoctors } = require("../controller/Doctors/DoctorsController");


router.route("/forms").post(newDoctor);
router.route("/forms").get(getAllDoctors);
router.route("/:userId").get(getDoctorById);
router.route("/:userId").get(getDoctorDetailsById);



module.exports =router;