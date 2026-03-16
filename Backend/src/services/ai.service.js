const { GoogleGenAI } = require("@google/genai")
const {z} = require("zod")
const { zodtoJsonSchema, default: zodToJsonSchema }=require("zod-to-json-schema")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});



// async function invokeGeminiAi() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hello gemini! how are you today?"
//   });

//   console.log(response.text);
// }
const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical question that can be asked in the interview"),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, and the approach to take"
          )
      })
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and suggested answer approach"
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral question that can be asked in the interview"),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How the candidate should answer this question and what points to include"
          )
      })
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention"
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill that the candidate is lacking"),

        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap")
      })
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity"
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("Day number in the preparation schedule"),

        focus: z
          .string()
          .describe(
            "Main topic or area the candidate should focus on that day"
          ),

        tasks: z
          .array(z.string())
          .describe(
            "List of specific tasks or exercises the candidate should complete"
          )
      })
    )
    .describe(
      "A structured preparation plan to help the candidate improve skills before the interview"
    )
});
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

const prompt = `
You are an AI interview assistant.

Analyze the candidate information below and generate an interview preparation report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON with EXACTLY the following structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Important rules:
- Return ONLY JSON
- Do NOT add explanations
- Do NOT add extra fields
- Follow the schema strictly
`

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema)

    }
  })

  const result = JSON.parse(response.text)

  return JSON.parse(result.text)
}
module.exports = generateInterviewReport;