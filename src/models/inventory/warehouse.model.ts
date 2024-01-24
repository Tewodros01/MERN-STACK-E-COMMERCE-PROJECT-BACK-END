import mongoose, { Model, Schema, Document } from "mongoose";

interface IWarehouse {
  warehouseName: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  capacity: number;
}

interface IWarehouseDocument extends Document, IWarehouse {
  warehouseId: string;
}

const warehouseSchema = new Schema<IWarehouseDocument>(
  {
    warehouseName: { type: String, required: true },
    location: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    capacity: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.warehouseId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const WarehouseModel: Model<IWarehouseDocument> =
  mongoose.model<IWarehouseDocument>("Warehouse", warehouseSchema);

export { IWarehouse, IWarehouseDocument, WarehouseModel };
