// const mongoose= require("mongoose")

// const userSchema=new mongoose.Schema({
//   username:{
//     type:String,
//     unique:[true,"username already taken"],
//     required:true,
//   },
//   email:{
//     type:String,
//     unique:[true,"email alreday exists"],
//     required:true,
//   },
//   password:{
//     type:String,
//     required:true
//   }
// })

// const userModel=mongoose.model("users",userSchema)


// module.exports=userModel
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address"
        ]
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }

}, {
    timestamps: true
})

// ✅ optional but cleaner indexing
// userSchema.index({ email: 1 }, { unique: true })
// userSchema.index({ username: 1 }, { unique: true })

const userModel = mongoose.model("users", userSchema)

module.exports = userModel