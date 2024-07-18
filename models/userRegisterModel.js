// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     name:{
//         type:String,
//         require:[true,"please add the username"]
//     },
//     email:{
//         type:String,
//         require:[true,"please add the emailid"],
//         unique:[true,"email id already exits"]
//     },
//     password:{
//         type:String,
//         require:[true,"please add the password"]
//     }
// },
// {
//     timeStamps:true
// }
// )

// module.exports = mongoose.model("User",userSchema)


const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add the email id"],
        unique: [true, "Email id already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    },
    otp: {
        type: String,
        required: false
    },
    otpExpiration: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
