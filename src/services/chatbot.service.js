import Groq from "groq-sdk";
import { buildStudentPrompt } from "../utils/chatbotprompt.js";
import MongoStudentRepository from "../repositories/implementations/MongoStudentRepository.js";
import config from "../config/environment.js";

const studentRepo = new MongoStudentRepository();

let groqInstance = null;
const getGroqClient = () => {
    if (!groqInstance) {
        const apiKey = config.KEY || config.GROK_API_KEY || process.env.KEY || process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("Groq API Key is missing! Please provide KEY, GROK_API_KEY, or GROQ_API_KEY in environment variables.");
        }
        groqInstance = new Groq({ apiKey });
    }
    return groqInstance;
};

export const chatService = async ({ message, student }) => {
  const groq = getGroqClient();

  const studentData = await studentRepo.findStudentById(student.userId || student.id);
  
  const attendance = 75; 

  const prompt = buildStudentPrompt({
    name: studentData ? studentData.name : "Student",
    attendance
  });
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: message,
      }
    ],
    model: "openai/gpt-oss-20b", 
  });

  return completion.choices[0].message.content;
};