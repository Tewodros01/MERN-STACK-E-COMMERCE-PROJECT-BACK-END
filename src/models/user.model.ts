import mongoose, { Model, Schema, Document } from "mongoose";

interface IUser {
  username: string;
  fullName: string;
  email: string;
  password: string;
  contact: string;
  roles: string[];
  permissions: string[];
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
    contact: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
    permissions: { type: [String], default: [] },
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
