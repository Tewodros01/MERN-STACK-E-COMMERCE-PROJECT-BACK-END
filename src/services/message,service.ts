import { IMessageDocument, MessageModel } from "../models/message.model";

const messageService = {
  getAllMessages: async (
    sender: string,
    receiver: string,
  ): Promise<IMessageDocument[]> => {
    return MessageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }, // Include reverse messages
      ],
    }).sort({ timestamp: 1 });
  },

  addMessage: async (
    sender: string,
    receiver: string,
    content: string,
  ): Promise<IMessageDocument> => {
    const newMessage = new MessageModel({ sender, receiver, content });
    return newMessage.save();
  },
};

export default messageService;
