const asyncHandler = require("express-async-handler");
const DoctorsFormModel = require("../models/DoctorsFormModel");

const newDoctor = asyncHandler(async (req, res) => {
  const {
    specialization,
    qualification,
    medicalLicenseNumber,
    yearsOfExperience,
    boardCertification,
    currentlyWorkingHospitalName,
    workPlaceContactNumber,
    consultationHours,
    availableDays,
    residencyProgram,
    professionalMembership,
  } = req.body;
  console.log(req.body);

  if (
    !specialization ||
    !qualification ||
    !medicalLicenseNumber ||
    !yearsOfExperience ||
    !boardCertification ||
    !currentlyWorkingHospitalName ||
    !workPlaceContactNumber ||
    !consultationHours ||
    !availableDays ||
    !residencyProgram ||
    !professionalMembership
  ) {
    res.status(400);
    throw new Error("All  fields are required");
  }

  try {
    const Doctor = await DoctorsFormModel.create({
      specialization,
      qualification,
      medicalLicenseNumber,
      yearsOfExperience,
      boardCertification,
      currentlyWorkingHospitalName,
      workPlaceContactNumber,
      consultationHours,
      availableDays,
      residencyProgram,
      professionalMembership,
    });

    res.status(201).json(Doctor);
  }
   catch (error) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { newDoctor };