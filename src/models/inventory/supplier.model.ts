import mongoose, { Model, Schema, Document } from "mongoose";

interface ISupplier {
  supplierName: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface ISupplierDocument extends Document, ISupplier {
  supplierId: string;
}

const supplierSchema = new Schema<ISupplierDocument>(
  {
    supplierName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
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
        ret.supplierId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const SupplierModel: Model<ISupplierDocument> =
  mongoose.model<ISupplierDocument>("Supplier", supplierSchema);

export { ISupplier, ISupplierDocument, SupplierModel };
