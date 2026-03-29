// const multer= require("multer")

// const upload=multer({
//   storage:multer.memoryStorage(),
//   limits:{
//     fileSize:3*1024*1024
//   }
// })
// module.exports=upload

const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },

    // ✅ FILE TYPE VALIDATION
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only PDF files are allowed"), false)
        }
    }
})

module.exports = upload