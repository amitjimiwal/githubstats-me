const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function getAIReply(commitMessage: string): Promise<string> {
     // For text-only input, use the gemini-pro model
     try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `Given a string "${commitMessage}" representing a user's first commit message on GitHub, generate a one line humorous quote, capturing the essence of the message in a lighthearted and relatable way.`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          return text+"- The AI";
     } catch (error) {
          return "May your commits be frequent and your code be clean. - The AI";
     }
}
export default getAIReply;

