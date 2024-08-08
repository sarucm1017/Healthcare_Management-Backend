const express = require("express");
const router = express.Router();
const {newPatient, getPatientById} = require("../controller/PatientFormController");
const {getPatientByUserId} = require ("../controller/Patient/PatientDashboardController")


router.route("/forms").post(newPatient);
router.route("/forms/:userId").get(getPatientByUserId);
router.route("/forms/:userId").get(getPatientById)





module.exports =router;