const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        throw err;
    }
}

module.exports = connectDB;