const { generateInterviewReport } = require("./ai.service");

// Dummy Test Data
const testResume = `
Kausik Naskar
Email: kausik@example.com
Experience: 3 years in full-stack development. Proficient in React, Node.js, and MongoDB.
`;

const testSelfDescription = "I am a passionate software engineer looking for exciting backend roles.";
const testJobDescription = "We are looking for a Node.js developer with at least 2 years of experience. Must know Express, MongoDB, and REST APIs.";

async function runTest() {
    console.log("🚀 Starting Gemini API Test...");
    try {
        const result = await generateInterviewReport({
            resume: testResume,
            selfDescription: testSelfDescription,
            jobDescription: testJobDescription
        });

        console.log("✅ Successfully received response from Gemini API!");
        console.log("-------------------------------------------------");
        console.log(JSON.stringify(result, null, 2));
        console.log("-------------------------------------------------");
    } catch (error) {
        console.error("❌ Failed to call Gemini API:");
        console.error(error);
    }
}

runTest();
