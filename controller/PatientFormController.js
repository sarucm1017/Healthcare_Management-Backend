const asyncHandler = require("express-async-handler");
const PatientFormModel = require("../models/PatientFormModel");

const newPatient = asyncHandler(async (req, res) => {
  const {
    address,
    emergency_contact,
    age,
    city,
    state,
    country,
    medical_history,
    current_medications,
    allergies,
    chronic_conditions,
    health_insurance_provider,
    health_insurance_policy_number,
  } = req.body;

  console.log(req.body);

  if (!address || !emergency_contact || !age || !city || !state || !country) {
    res.status(400);
    throw new Error("All  fields are required");
  }

  try {
    const Patient = await PatientFormModel.create({
      address,
      emergency_contact,
      age,
      city,
      state,
      country,
      medical_history,
      current_medications,
      allergies,
      chronic_conditions,
      health_insurance_provider,
      health_insurance_policy_number,
    });
    res.status(201).json(Patient);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { newPatient };
