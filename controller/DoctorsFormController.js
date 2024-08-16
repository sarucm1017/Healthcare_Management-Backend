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
    location,
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
    !location||
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
      location,
      userEmail,
      userId: user._id ,
      userName: user.name
    });
  
    console.log({Doctor, userId :Doctor.userId});
    
    res.status(201).json({Doctor, doctorId: Doctor._id, userId :Doctor.userId});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//////////////get doctor by id ////////////////////

const getDoctorById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const doctor = await DoctorsFormModel.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//////////////get doctorsdetails by id for proflie//////

const getDoctorDetailsById = asyncHandler(async (req, res) => {

  try {
    const doctorId = req.params.id; 
    const doctor = await DoctorsFormModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


//////////////update profile ////////////////

const updateDoctor = asyncHandler(async (req,res) => {
  try{
    const doctor = await DoctorsFormModel.findOneAndUpdate(
      {userId: req.params.userId},
      req.body,
      {new: true}
    );
    if(!doctor){
      return res.status(404).json({ message: 'Doctor not found' });
  }
  res.status(200).json(doctor);
}catch{
  res.status(500).json({ message: "Server error", error });
}
})


module.exports = { newDoctor, getDoctorById, getDoctorDetailsById, updateDoctor};