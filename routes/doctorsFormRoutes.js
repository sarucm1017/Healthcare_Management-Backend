const express = require("express");
const router = express.Router();    
const {newDoctor, getDoctorById, getDoctorDetailsById, updateDoctor} = require("../controller/DoctorsFormController");
const { getAllDoctors, createReport } = require("../controller/Doctors/DoctorsController");


router.route("/forms").post(newDoctor);
router.route("/forms").get(getAllDoctors);
router.route("/:userId").get(getDoctorById);
router.route("/:userId").get(getDoctorDetailsById);
router.route("/:userId").put(updateDoctor);
router.route("/report").post(createReport)



module.exports =router;