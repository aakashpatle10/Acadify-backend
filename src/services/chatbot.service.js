import Groq from "groq-sdk";
import { buildStudentPrompt } from "../utils/chatbotprompt.js";
import MongoStudentRepository from "../repositories/implementations/MongoStudentRepository.js";
import config from "../config/environment.js";

const studentRepo = new MongoStudentRepository();

const groq = new Groq({
    apiKey: config.KEY || config.GROK_API_KEY || process.env.KEY,
});

export const chatService = async ({ message, student }) => {

  const studentData = await studentRepo.findStudentById(student.userId || student.id);
  
  const attendance = 75; 

  if (!config.KEY && !config.GROK_API_KEY && !process.env.KEY) {
      throw new Error("Groq API Key is missing in your .env file! Please add KEY=...");
  }

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