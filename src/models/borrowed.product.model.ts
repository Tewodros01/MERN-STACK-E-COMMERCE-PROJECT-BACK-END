import mongoose, { Model, Schema, Document } from "mongoose";

interface IBorrowedProduct {
  productId: Schema.Types.ObjectId;
  supplierId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  quantity: number;
  dateBorrowed: Date;
  returnDate: Date;
}

interface IBorrowedProductDocument extends Document, IBorrowedProduct {
  borrowedProductId: string;
}

const borrowedProductSchema = new Schema<IBorrowedProductDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number, required: true },
    dateBorrowed: { type: Date, default: Date.now, required: true },
    returnDate: { type: Date, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.borrowedProductId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const BorrowedProductModel: Model<IBorrowedProductDocument> =
  mongoose.model<IBorrowedProductDocument>(
    "BorrowedProduct",
    borrowedProductSchema,
  );

export { IBorrowedProduct, IBorrowedProductDocument, BorrowedProductModel };
