import mongoose, { Model, Schema, Document } from "mongoose";

interface ITaxConfiguration {
  taxCode: string;
  description: string;
  rate: number;
}

interface ITaxConfigurationDocument extends Document, ITaxConfiguration {
  taxConfigurationId: string;
}

const taxConfigurationSchema = new Schema<ITaxConfigurationDocument>(
  {
    taxCode: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.taxConfigurationId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const TaxConfigurationModel: Model<ITaxConfigurationDocument> =
  mongoose.model<ITaxConfigurationDocument>(
    "TaxConfiguration",
    taxConfigurationSchema,
  );

export { ITaxConfiguration, ITaxConfigurationDocument, TaxConfigurationModel };
