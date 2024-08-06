const asyncHandler = require("express-async-handler");
const PatientFormModel = require("../models/PatientFormModel");
const userModel = require("../models/userRegisterModel");


app.get('/api/patients/:userId', async (req, res) => {
    try {
      const patient = await Patient.findOne({ userId: req.params.userId });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  