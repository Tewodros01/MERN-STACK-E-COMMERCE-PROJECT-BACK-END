import mongoose, { Model, Schema, Document } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  username: string;
  roles: string[];
}

interface IUserDocument extends Document, IUser {
  userId: string;
  token: string;
  stripeCustomerId: string;
  refreshToken: string[];
}

const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["user"] },
    stripeCustomerId: { type: String },
    token: { type: String },
    refreshToken: [{ type: String }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.userId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
    timestamps: true,
  },
);

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema,
);

export { IUser, IUserDocument, UserModel };
