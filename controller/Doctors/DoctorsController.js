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
      doctorId,
      
    } = req.body;


    // const newReport = new reportModel({
    //   patientName,
    //   bloodGroup,
    //   pulseRate,
    //   breathingRate,
    //   bodyTemperature,
    //   bloodPressure,
    //   oxygenSaturation,
    //   height,
    //   weight,
    //   diagnosis,
    //   symptoms,
    //   currentMedications,
    //   prescribedTreatment,
    //   doctorId:doctorId,
      
    // });

   
    

    const savedReport = await reportModel.create({
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
      doctorId,
    });

    console.log(doctorId);
    res.status(201).json(savedReport);
    console.log(savedReport);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to create report', error });
  }
};

module.exports = {getAllDoctors,createReport}