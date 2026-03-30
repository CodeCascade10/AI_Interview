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

keyStrengths: {
    type: [String],
    default: []
},

resumeTips: {
    type: [String],
    default: []
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
