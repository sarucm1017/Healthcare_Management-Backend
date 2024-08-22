const express = require("express");
const router = express.Router();    
const {newDoctor, getDoctorById, getDoctorDetailsById, updateDoctor,getDoctorByDoctorId} = require("../controller/DoctorsFormController");
const { getAllDoctors, createReport, getReportByDoctorId, getReportByReportId } = require("../controller/Doctors/DoctorsController");
router.route("/report").post(createReport);
router.route("/reports/:doctorId").get(getReportByDoctorId);
router.route("/reports/:reportId").get(getReportByReportId);
router.route("/forms").post(newDoctor);
router.route("/forms").get(getAllDoctors);
router.route("/:userId").get(getDoctorById);
router.route("/:userId").get(getDoctorDetailsById);
router.route("/:userId").put(updateDoctor);
router.route("/data/:doctorId").get(getDoctorByDoctorId);




module.exports =router;