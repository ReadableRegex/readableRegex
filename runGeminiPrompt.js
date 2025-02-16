const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.example" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function fetchAiGeneratedContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); //setup gemini model
    const result = await model.generateContent([prompt]); // run the model with the prompt
    return result.response.text(); // return the string result
  } catch (e) {
    console.error("Error generating content:", e.message);
    return e.message;
  }
}
module.exports = fetchAiGeneratedContent;
