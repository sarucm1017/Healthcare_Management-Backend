const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  pulseRate: { type: String, required: true },
  breathingRate: { type: String, required: true },
  bodyTemperature: { type: String, required: true },
  bloodPressure: { type: String, required: true },
  oxygenSaturation: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  diagnosis: { type: String, required: true },
  symptoms: { type: String, required: true },
  currentMedications: { type: String, required: true },
  prescribedTreatment: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
});

module.exports = mongoose.model('Report', reportSchema);