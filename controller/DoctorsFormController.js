const asyncHandler = require("express-async-handler");
const DoctorsFormModel = require("../models/DoctorsFormModel");
const userModel = require("../models/userRegisterModel");

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
    userEmail
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
    !professionalMembership ||
    !userEmail
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    // Fetch the user to get the userId
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

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
      userEmail,
      userId: user._id ,
      userName: user.name
    });

    res.status(201).json(Doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { newDoctor };