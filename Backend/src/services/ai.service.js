const { GoogleGenAI } = require("@google/genai");

// Initializing the new GenAI SDK with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `
You are an AI Interview Assistant.

Resume:
${resume}

${selfDescription ? `Self Description:\n${selfDescription}\n` : ''}
Job Description:
${jobDescription}

Return ONLY valid JSON with exactly this structure:

{
  "matchScore": number,
  "keyStrengths": ["string", "string"],
  "resumeTips": ["string", "string"],
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
`;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        const cleaned = text.replace(/```json|```/g, "").trim();

        return JSON.parse(cleaned);

    } catch (err) {
        console.error("AI ERROR:", err);
        throw err;
    }
}

module.exports = { generateInterviewReport };
