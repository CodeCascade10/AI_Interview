// const mongoose= require('mongoose')


// const blacklistTokenSchema= new mongoose.Schema({
//   token:{
//     type:String,
//     requireed:[true,"token is required to be added in blacklist"]
//   }
// },{
//   timestamps: true
// })

// const tokenBlacklistModel= mongoose.model("blacklistTokens",blacklistTokenSchema)


// module.exports=tokenBlacklistModel

const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1d" // ⏳ auto delete after 1 day
    }
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel