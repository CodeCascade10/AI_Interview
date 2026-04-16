// const express= require("express")
// const cookieParser= require("cookie-parser")
// const cors= require("cors")

// const app =express()

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//   origin:"http://localhost:5173",
//   credentials:true
// }))


// /* require all the routes here*/
// const authRouter=require("./routes/auth.routes")
// const interviewRouter=require("./routes/interview.routes")



// /* using all the routes here */
// app.use("/api/auth",authRouter)
// app.use("/api/interview",interviewRouter)


// module.exports=app
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")

const app = express()

/**

* =========================
* MIDDLEWARES
* =========================
  */

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: true,
  credentials: true
}));
/**

* =========================
* ROUTES
* =========================
  */

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/**

* =========================
* HEALTH CHECK (optional but useful)
* =========================
  */
  app.get("/", (req, res) => {
  res.send("API is running 🚀")
  })

/**

* =========================
* MULTER ERROR HANDLER
* =========================
  */
  app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
  return res.status(400).json({
  message: err.message
  })
  }

  if (err.message === "Only PDF files are allowed") {
  return res.status(400).json({
  message: err.message
  })
  }

  next(err)
  })

/**

* =========================
* GLOBAL ERROR HANDLER
* =========================
  */
  app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack)

  res.status(500).json({
  message: "Internal Server Error"
  })
  })

module.exports = app
