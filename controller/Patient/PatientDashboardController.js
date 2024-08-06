const asyncHandler = require("express-async-handler");
const PatientFormModel = require("../../models/PatientFormModel");



// @desc    Get patient by user ID
// @route   GET /api/patients/:userId
// @access  Public
const getPatientByUserId = asyncHandler(async (req, res) => {
    const patient = await PatientFormModel.findOne({ userId: req.params.userId });
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    } else {
      res.json(patient);
    }
  });

  module.exports = {getPatientByUserId,};
  