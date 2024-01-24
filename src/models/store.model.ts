import mongoose, { Model, Schema, Document } from "mongoose";

interface IStore {
  name: string;
  address: string;
  contactInformation: string;
  ownerId: Schema.Types.ObjectId;
}

interface IStoreDocument extends Document, IStore {
  storeId: string;
}

const storeSchema = new Schema<IStoreDocument>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactInformation: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.storeId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const StoreModel: Model<IStoreDocument> = mongoose.model<IStoreDocument>(
  "Store",
  storeSchema,
);

export { IStore, IStoreDocument, StoreModel };
