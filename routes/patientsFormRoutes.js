const express = require("express");
const router = express.Router();
const {newPatient, getPatientById, updatePatient} = require("../controller/PatientFormController");
const {getPatientByUserId} = require ("../controller/Patient/PatientDashboardController")


router.route("/forms").post(newPatient);
router.route("/forms/:userId").get(getPatientByUserId);
router.route("/forms/:userId").get(getPatientById);
router.route("/forms/:userId").put(updatePatient);





module.exports =router;