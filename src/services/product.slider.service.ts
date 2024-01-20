import { MONGO_DB_CONFIG } from "../config/app.config";
import { ISlider, ISliderDocument, SliderModel } from "../models/slider.model";
import fs from "fs-extra";
import path from "path";

const productSliderService = {
  createSlider: async (newSlider: ISlider): Promise<ISliderDocument> => {
    try {
      if (!newSlider.sliderName) {
        throw new Error("Slider name is required");
      }

      const createdSlider = new SliderModel(newSlider);
      await createdSlider.save();
      return createdSlider as ISliderDocument;
    } catch (err) {
      throw new Error(`Error creating slider  ${err}`);
    }
  },

  getAllSliders: async (
    sliderName?: string,
    page?: string,
    pageSize?: string,
  ): Promise<ISliderDocument> => {
    try {
      let condition = sliderName
        ? { slider_name: { $regex: new RegExp(sliderName), $option: "i" } }
        : {};

      let perPage = Math.abs(parseInt(pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
      let pag = (Math.abs(parseInt(page!)) || 1) - 1;

      const sliders = await SliderModel.find(
        condition,
        "sliderName sliderDescription sliderURL sliderImagePath",
      )
        .limit(perPage)
        .skip(perPage * pag);

      return sliders as unknown as ISliderDocument;
    } catch (error: any) {
      throw new Error(`Error retriving sliders ${error.message}`);
    }
  },

  getSliderById: async (id: string): Promise<ISliderDocument> => {
    try {
      console.log(id);
      const slider = await SliderModel.findById(id).lean();
      if (!slider) throw "not Found slider with" + id;
      else return slider as ISliderDocument;
    } catch (err) {
      throw new Error(`Error retriving slider with id ${id}: ${err}`);
    }
  },

  updateSlider: async (
    id: string,
    sliderName: string,
    sliderDescription: string,
    sliderURL: string,
    sliderImagePath: string,
  ): Promise<ISliderDocument> => {
    try {
      const slider = await SliderModel.findById(id).lean();
      console.log(id);
      if (slider && slider.sliderName) {
        const exist = await fs.pathExists(path.resolve(slider.sliderName));
        if (exist) await fs.unlink(path.resolve(slider.sliderName));
      }
      const updateSlider = await SliderModel.findByIdAndUpdate(
        id,
        {
          sliderName,
          sliderDescription,
          sliderURL,
          sliderImagePath,
        },
        { new: true },
      ).lean();
      if (!updateSlider) throw "Not found slider with id " + id;
      else return updateSlider as unknown as ISliderDocument;
    } catch (err) {
      throw new Error(`Error updating slider with id ${id}: ${err}`);
    }
  },

  deleteSlider: async (id: string): Promise<ISliderDocument> => {
    try {
      const slider = await SliderModel.findByIdAndDelete(id).lean();
      if (slider && slider.sliderImagePath) {
        const exist = await fs.pathExists(path.resolve(slider.sliderImagePath));
        if (exist) await fs.unlink(path.resolve(slider.sliderImagePath));
      }
      if (!slider) throw "Not Found Slider with id " + id;
      else return slider as ISliderDocument;
    } catch (err) {
      throw new Error(`Error deleting slider with id ${id}: ${err}`);
    }
  },
};

export default productSliderService;
