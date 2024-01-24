import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IInventory {
  product: Types.ObjectId;
  supplier: Types.ObjectId;
  quantityOnHand: number;
  quantityOnOrder: number;
  quantityReserved: number;
  lastUpdated: Date;
}

interface IInventoryDocument extends Document, IInventory {
  inventoryId: string;
}

const inventorySchema: Schema = new Schema(
  {
    product: { type: Types.ObjectId, required: true, ref: "Product" },
    supplier: { type: Types.ObjectId, required: true, ref: "Supplier" },
    quantityOnHand: { type: Number, required: true },
    quantityOnOrder: { type: Number, default: 0 },
    quantityReserved: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.inventoryId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const inventoryModel: Model<IInventoryDocument> =
  mongoose.model<IInventoryDocument>("Inventory", inventorySchema);

export { inventoryModel, IInventory, IInventoryDocument };
