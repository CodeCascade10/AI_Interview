// const mongoose =require('mongoose');

/**
 * @job_decsription schema:String
 * @resume-text:String
 * @Self description:String
 * 
 * 
 * --Overall Score:Number
 * 
 * 
 * -Technical questions:
 *      [{
 *       question :"",
 *       intention :"",
 *       answer:""
 *       }]
 * -Behavioral questions:
 *      [{
 *       question :"",
 *       intention :"",
 *       answer:""
 *       }]
 * -Skill gaps:[{
 *      skil:""
 *      severity:{
 *       type:String,
 *       enum:["low","medium","high"]
 * }
 * }]
 * -Preparation plan:[{
 *     day:Number,
 *     focus:String,
 *     Tasks:[String]
 * }]
 */

// const techinalQuestionSchema=new mongoose.Schema({
//   question:{
//     type:String,
//     required:[true,"Techinal question is required"]
//   },
//   intention:{
//     type:String,
//     required:[true,"Intention is required"]
//   },
//   answer:{
//     type:String,
//     required:[true,"Answer is required"]
//   }
// },{
//   _id:false
// })
// const behavioralQuestionsSchema =new mongoose.Schema({
//   question:{
//     type:String,
//     required:[true,"Techinal question is required"]
//   },
//   intention:{
//     type:String,
//     required:[true,"Intention is required"]
//   },
//   answer:{
//     type:String,
//     required:[true,"Answer is required"]
//   }
// },{
//   _id:false
// })

// const skillGapSchema=new mongoose.Schema({
//   skil:{
//     type:String,
//     required:[true,"Skill is required"]
//   },
//   severity:{
//     type:String,
//     enum:["low","medium","high"],
//     required:[true,"Severity is required"]
//   }},
//   {
//     _id:false
//   }
// )
// const preparationPlanSchema=new mongoose.Schema({
//   day:{
//     type:Number,
//     required:[true,"day is required"]
//   },
//   focus:{
//     type:String,
//     required:[true,"Focus is required"]
//   },
//   tasks:{
//     type:String,
//     required:[true,"Task is required"]
//   }
// })

// const interviewReportSchema =new mongoose.Schema({
//   jobDescription:{
//     type:String,
//     required:[true,"Job description is required"]
//   },
//   resume:{
//       type:String,
//   },
//   selfDescription:{
//     type:String,
//   },
//   matchScore:{
//     type:Number,
//     min:0,
//     max:100,
//   },
//   technicalQuestions:[techinalQuestionSchema],
//   behvioralQuestions:[behavioralQuestionsSchema],
//   skillGaps:[skillGapSchema],
//   preparationPlan:[preparationPlanSchema]
// },{
//   timestamp:true
// })


// const InterviewReportModel = mongoose.model.Schema("InterviewReport",interviewReportSchema);

// module.exports=InterviewReportModel;

const mongoose = require("mongoose")

// =====================
// SUB SCHEMAS
// =====================

const technicalQuestionSchema = new mongoose.Schema({
question: String,
intention: String,
answer: String
}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
question: String,
intention: String,
answer: String
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
skill: String,
severity: {
type: String,
enum: ["low", "medium", "high"]
}
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
day: Number,
focus: String,
tasks: [String]
}, { _id: false })

// =====================
// MAIN SCHEMA
// =====================

const interviewReportSchema = new mongoose.Schema({
jobDescription: String,
resume: String,
selfDescription: String,


matchScore: {
    type: Number,
    min: 0,
    max: 100
},

technicalQuestions: {
    type: [technicalQuestionSchema],
    default: []
},

behavioralQuestions: {
    type: [behavioralQuestionSchema],
    default: []
},

skillGaps: {
    type: [skillGapSchema],
    default: []
},

preparationPlan: {
    type: [preparationPlanSchema],
    default: []
},

title: {
    type: String,
    default: "Untitled Report"
},

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
}

}, {
timestamps: true
})

// index
interviewReportSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model("InterviewReport", interviewReportSchema)
