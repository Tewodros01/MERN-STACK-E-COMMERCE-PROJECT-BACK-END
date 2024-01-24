import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IUserPoints {
  user_id: Types.ObjectId;
  points_earned: number;
  points_spent: number;
}
interface IUserPointsDocument extends Document, IUserPoints {
  userPointsId: string;
}

const userPointsSchema: Schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    points_earned: { type: Number, default: 0 },
    points_spent: { type: Number, default: 0 },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.userPointsId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const UserPointsModel: Model<IUserPointsDocument> =
  mongoose.model<IUserPointsDocument>("UserPoints", userPointsSchema);

export { IUserPoints, IUserPointsDocument, UserPointsModel };
