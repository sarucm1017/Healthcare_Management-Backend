const mongoose = require('mongoose');


const  PatientSchema = new mongoose.Schema({
    
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
    health_insurance_policy_number: String,
    userEmail: { type: String, required: true } ,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    userName: { type: String, required: true }
})





module.exports = mongoose.model('PatientForms', PatientSchema)

// specialty: String,
// experience: String,
// clinic_address: String,
// consultation_fee: Number,