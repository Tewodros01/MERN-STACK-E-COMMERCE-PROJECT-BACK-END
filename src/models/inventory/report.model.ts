import mongoose, { Model, Schema, Document } from "mongoose";

interface IReport {
  reportName: string;
  reportType: string;
  parameters: Record<string, any>; // Parameters can be of any type
}

interface IReportDocument extends Document, IReport {
  reportId: string;
}

const reportSchema = new Schema<IReportDocument>(
  {
    reportName: { type: String, required: true },
    reportType: { type: String, required: true },
    parameters: { type: Schema.Types.Mixed }, // Mixed type for storing various parameter types
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.reportId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ReportModel: Model<IReportDocument> = mongoose.model<IReportDocument>(
  "Report",
  reportSchema,
);

export { IReport, IReportDocument, ReportModel };
