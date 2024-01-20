import mongoose, { Model, Schema, Document } from "mongoose";

interface ICategory {
  categoryName: string;
  categoryDescription: string;
  categoryImagePath?: string;
}

interface ICategoryDocument extends ICategory, Document {
  categoryId: string;
}

const categorySchema = new Schema<ICategoryDocument>(
  {
    categoryName: { type: String },
    categoryDescription: { type: String },
    categoryImagePath: { type: String },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.categoryId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const CategoryModel: Model<ICategoryDocument> =
  mongoose.model<ICategoryDocument>("Category", categorySchema);

export { CategoryModel, ICategory, ICategoryDocument };
