import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

async function checkModels() {
  try {
    // Retrieve the list of available models
    const response = await ai.models.list();

    console.log("--- Available Gemini Models ---");
    
    // Iterate and print details for each model
    for (const model of response.models) {
      console.log(`Name: ${model.name}`);
      console.log(`Display Name: ${model.displayName}`);
      console.log(`Supported Actions: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('-----------------------------');
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

checkModels();
