// require("dotenv").config()
// const app= require("./src/app")
// const connectToDB=require("./src/config/database")
// // const invokeGeminiAi=require("./src/services/ai.service")
// const { resume,selfDescription, jobDescription } = require("./src/services/temp")
// const generateInterviewReport=require("./src/services/ai.service")


// generateInterviewReport({resume,selfDescription,jobDescription})
// connectToDB()
// // invokeGeminiAi()

// app.listen(3000, ()=>{
//   console.log("Server is running on port 3000")
// })
require("dotenv").config({ path: "./.env" })

const app = require("./src/app")
const connectToDB = require("./src/config/database")

const PORT = process.env.PORT || 3000

/**

* =========================
* START SERVER
* =========================
  */

connectToDB()
    .then(() => {
        console.log("Database connected ✅");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} 🚀`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed ❌");
        console.error(err.message);
        process.exit(1);
    });
