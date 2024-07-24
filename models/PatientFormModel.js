const mongoose = require('mongoose');


const  PatientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    address: String,
    emergency_contact: String,
    age: String,
    city: String,
    state: String,
    country: String,
    medical_history: String,
    current_medications: String,
    allergies: String,
    chronic_conditions: String,
    health_insurance_provider: String,
    health_insurance_policy_number: String
})





module.exports = mongoose.model('PatientForms', PatientSchema)

// specialty: String,
// experience: String,
// clinic_address: String,
// consultation_fee: Number,