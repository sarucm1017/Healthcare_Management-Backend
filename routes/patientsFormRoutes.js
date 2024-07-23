const express = require("express");
const router = express.Router();
const {newPatient} = require("../controller/PatientFormController");


router.route("/forms").post(newPatient);





module.exports =router;