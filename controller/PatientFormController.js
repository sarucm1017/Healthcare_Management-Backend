const asyncHandler = require("express-async-handler");
const PatientFormModel = require("../models/PatientFormModel");
const userModel = require("../models/userRegisterModel");

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
    userEmail
  } = req.body;

  console.log(req.body);

  if (!address || !emergency_contact || !age || !city || !state || !country || !userEmail) {
    res.status(400);
    throw new Error("All  fields are required");
  }

  try {

    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

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
      userEmail,
      userId: user._id ,
      userName: user.name
    });
    res.status(201).json(Patient);
  } catch (error) {
    console.error("Error creating patient:", error.message);
    res.status(400).json({ message: error.message });
  }
});

////////////////////patientcontroller to get patientdetails by id/////////

const getPatientById = async (req,res) =>  {
  
  try {
    const patientId = req.params.id; // Get the ID from the request parameters
    const patient = await PatientFormModel.findById(patientId);
    

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}

}

module.exports = { newPatient, getPatientById};
