import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}
interface IMessageDocument extends Document, IMessage {
  messageId: string;
}

const messageSchema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.messageId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const MessageModel: Model<IMessageDocument> = mongoose.model<IMessageDocument>(
  "Message",
  messageSchema,
);

export { IMessage, IMessageDocument, MessageModel };
