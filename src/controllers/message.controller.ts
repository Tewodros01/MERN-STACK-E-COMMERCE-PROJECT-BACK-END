import { Request, Response } from "express";
import messageService from "../services/message.service";

const messageController = {
  getAllMessages: async (req: Request, res: Response): Promise<void> => {
    const { sender, receiver } = req.query;
    const messages = await messageService.getAllMessages(
      sender!.toString(),
      receiver!.toString(),
    );
    res.json(messages);
  },

  addMessage: async (req: Request, res: Response): Promise<void> => {
    const { sender, receiver, content } = req.body;
    const newMessage = await messageService.addMessage(
      sender,
      receiver,
      content,
    );
    res.json(newMessage);
  },
};

export default messageController;
