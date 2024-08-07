const doctorModel = require("../../models/DoctorsFormModel");


const getAllDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).json(doctors);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
      }
}

module.exports = {getAllDoctors}