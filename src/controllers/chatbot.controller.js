import { chatService } from "../services/chatbot.service.js";

export const chatController = async (req, res, next) => {
  try {
    const student = req.user; 
    const { message } = req.body;

    const reply = await chatService({
      message,
      student
    });

    res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    next(error); 
  }
};