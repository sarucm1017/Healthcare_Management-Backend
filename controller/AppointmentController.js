const asyncHandler = require("express-async-handler");
const appointmentModel = require("../models/AppointmentModel");

const createAppointment = async (req, res) => {
    const { doctorId, doctorName, doctorSpecialization, patientId, date, time } = req.body;
  
    try {
      const newAppointment = new appointmentModel({
        doctorId,
        doctorName,
        doctorSpecialization,
        patientId,
        date,
        time,
      });
  
      const savedAppointment = await newAppointment.create();
      res.status(201).json(savedAppointment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  };
  
  module.exports = {
    createAppointment,
  };