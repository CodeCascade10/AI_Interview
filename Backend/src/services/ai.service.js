const GOOGLE_GENAI_API_KEY=AIzaSyDsPDDLePlHgTddoNTMUaklJy26hnKSh7I
const axios = require("axios")


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
try {
const prompt = `
You are an AI Interview Assistant.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON:

{
  "matchScore": number,
  "technicalQuestions": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "behavioralQuestions": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "skillGaps": [
    { "skill": "", "severity": "low|medium|high" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "", "tasks": [""] }
  ],
  "title": ""
}
`
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        }
    )

    const text = response.data.candidates[0].content.parts[0].text

    const cleaned = text.replace(/```json|```/g, "").trim()

    return JSON.parse(cleaned)

} catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message)
    throw err
}
````

}

module.exports = { generateInterviewReport }
console.log("KEY:", process.env.GEMINI_API_KEY)
