import mongoose, { Model, Schema, Document } from "mongoose";

interface ISlider {
  sliderName: string;
  sliderDescription: string;
  sliderURL: string;
  sliderImagePath: string;
}
interface ISliderDocument extends Document, ISlider {
  sliderId: string;
}

const sliderSchema = new Schema(
  {
    sliderName: { type: String, required: true, unique: true },
    sliderDescription: { type: String, required: true },
    sliderURL: { type: String, required: true },
    sliderImagePath: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (dec, ret) {
        ret.sliderId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const SliderModel = mongoose.model<ISliderDocument>("Slider", sliderSchema);

export { ISlider, ISliderDocument, SliderModel };
