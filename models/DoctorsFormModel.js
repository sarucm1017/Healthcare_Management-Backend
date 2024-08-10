const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
 
  specialization: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  medicalLicenseNumber: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: String,
    required: true
  },
  boardCertification: {
    type: String,
    required: true
  },
  currentlyWorkingHospitalName: {
    type: String,
    required: true
  },
  workPlaceContactNumber: {
    type: String,
    required: true
  },
  consultationHours: {
    type: String,
    required: true
  },
  availableDays: {
    type: String,
    required: true
  },
  residencyProgram: {
    type: String,
    required: true
  },
  professionalMembership: {
    type: String,
    required: true
  },
  userEmail: { type: String, required: true } ,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  userName: { type: String, ref: 'User', required: true }
}, {
  timestamps: true
});

const DoctorFormModel = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorFormModel;