import mongoose, { Model, Schema, Document } from "mongoose";

interface ICustomer {
  userId: string;
  fullName: string;
  contactNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface ICustomerDocument extends Document, ICustomer {}

const customerSchema = new Schema<ICustomerDocument>(
  {
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const CustomerModel: Model<ICustomerDocument> =
  mongoose.model<ICustomerDocument>("Customer", customerSchema);

export { ICustomer, ICustomerDocument, CustomerModel };
