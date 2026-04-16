// const pdfParse = require("pdf-parse")
// const generateInterviewReport = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model.report")
// const { interviewReportSchema } = require("../services/ai.service") // if exported

// function fixFlattenedArray(arr, keys) {
//   if (!Array.isArray(arr)) return arr

//   // already correct
//   if (typeof arr[0] === "object") return arr

//   const fixed = []
//   const step = keys.length * 2

//   for (let i = 0; i < arr.length; i += step) {
//     const obj = {}

//     for (let j = 0; j < keys.length; j++) {
//       let value = arr[i + (j * 2) + 1]

//       // 🔥 SPECIAL FIX for tasks (must be array)
//       if (keys[j] === "tasks") {
//         if (typeof value === "string") {
//           value = [value] // convert string → array
//         }
//       }

//       obj[keys[j]] = value
//     }

//     fixed.push(obj)
//   }

//   return fixed
// }

// async function generateInterviewReportController(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Resume file is required" })
//     }

//     // ✅ Parse PDF
//     const data = await pdfParse(req.file.buffer)
//     const resumeContent = data.text.slice(0, 3000)

//     const { selfDescription, jobDescription } = req.body

//     if (!jobDescription) {
//       return res.status(400).json({ message: "Job description is required" })
//     }

//     const aiResult = await generateInterviewReport({
//       resume: resumeContent,
//       selfDescription,
//       jobDescription
//     })

//     // 🔥 Fix bad AI output
//     aiResult.technicalQuestions = normalizeArray(aiResult.technicalQuestions)
//     aiResult.behavioralQuestions = normalizeArray(aiResult.behavioralQuestions)

//     // ✅ Validate using Zod
//     const parsed = interviewReportSchema.safeParse(aiResult)

//     if (!parsed.success) {
//       console.error(parsed.error)
//       return res.status(400).json({
//         message: "Invalid AI response format"
//       })
//     }

//     const interviewReport = await interviewReportModel.create({
//       user: req.user.id,
//       resume: resumeContent,
//       selfDescription,
//       jobDescription,
//       ...parsed.data
//     })

//     res.status(201).json({
//       message: "Interview Report generated successfully",
//       interviewReport
//     })

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       message: "Something went wrong",
//       error: error.message
//     })
//   }
// }

// module.exports = { generateInterviewReportController }

const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * GENERATE INTERVIEW REPORT
 */
async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            })
        }

        const { selfDescription, jobDescription } = req.body

        if (!jobDescription) {
            return res.status(400).json({
                message: "jobDescription is required"
            })
        }

        // ✅ FIXED PDF PARSE
        const data = await pdfParse(req.file.buffer)
        const resumeContent = data.text

        // ✅ AI CALL
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })

        // ⚠️ basic sanity check
        if (!interViewReportByAi || typeof interViewReportByAi !== "object") {
            return res.status(500).json({
                message: "AI returned invalid response"
            })
        }

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })

    } catch (error) {
        console.error("Generate Report Error:", error.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * GET SINGLE REPORT
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel
            .findOne({ _id: interviewId, user: req.user.id })
            .lean()

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })

    } catch (error) {
        console.error("Get Report Error:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * GET ALL REPORTS
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
            .lean()

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (error) {
        console.error("Get All Reports Error:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * GENERATE RESUME PDF
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        // ✅ FIXED: user ownership check
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch (error) {
        console.error("Generate PDF Error:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}