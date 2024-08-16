const doctorModel = require("../../models/DoctorsFormModel");
const reportModel = require('../../models/reportModel');


const getAllDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).json(doctors);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
      }
}


//////////////////reportcontroller//////////

const createReport =async (req,res) => {

  try {
    const {
      patientName,
      bloodGroup,
      pulseRate,
      breathingRate,
      bodyTemperature,
      bloodPressure,
      oxygenSaturation,
      height,
      weight,
      diagnosis,
      symptoms,
      currentMedications,
      prescribedTreatment,
    } = req.body;


    const newReport = new reportModel({
      patientName,
      bloodGroup,
      pulseRate,
      breathingRate,
      bodyTemperature,
      bloodPressure,
      oxygenSaturation,
      height,
      weight,
      diagnosis,
      symptoms,
      currentMedications,
      prescribedTreatment,
    });


    const savedReport = await newReport.create();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error });
  }
};

module.exports = {getAllDoctors,createReport}