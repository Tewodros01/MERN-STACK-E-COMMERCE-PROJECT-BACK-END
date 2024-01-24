import mongoose, { Model, Schema, Document, Types } from "mongoose";

interface IExpense {
  expenseCode: string;
  category: string;
  amount: number;
  date: Date;
  description: string;
}

interface IExpenseDocument extends Document, IExpense {
  expenseId: string;
}

const expenseSchema = new Schema<IExpenseDocument>(
  {
    expenseCode: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.expenseId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ExpenseModel: Model<IExpenseDocument> = mongoose.model<IExpenseDocument>(
  "Expense",
  expenseSchema,
);

export { IExpense, IExpenseDocument, ExpenseModel };
