import mongoose, { Model, Schema, Document } from "mongoose";

interface IShipping {
  orderId: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingStatus: string;
  estimatedDeliveryDate: Date;
}

interface IShippingDocument extends Document, IShipping {
  shippingId: string;
}

const shippingSchema = new Schema<IShippingDocument>(
  {
    orderId: { type: String, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingStatus: { type: String, required: true },
    estimatedDeliveryDate: { type: Date, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.shippingId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ShippingModel: Model<IShippingDocument> =
  mongoose.model<IShippingDocument>("Shipping", shippingSchema);

export { IShipping, IShippingDocument, ShippingModel };
