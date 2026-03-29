// const express=require("express")
// const authMiddleware=require("../middlewares/auth.middleware")
// const interviewController=require("../controllers/interview.controller")
// const upload=require("../middlewares/file.middleware")

// const interviewRouter=express.Router()

// /**
//  * @route POST /api/interview/
//  * @description generate new interview report on the basis of user self description resume pdf & job description
//  * @access private
//  */
// interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

// module.exports=interviewRouter
const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

// CREATE REPORT
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterViewReportController
)

// GET ALL REPORTS
interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReportsController
)

// GET SINGLE REPORT
interviewRouter.get(
    "/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdController
)

// GENERATE RESUME PDF (cleaner route)
interviewRouter.post(
    "/:interviewReportId/resume-pdf",
    authMiddleware.authUser,
    interviewController.generateResumePdfController
)

module.exports = interviewRouter