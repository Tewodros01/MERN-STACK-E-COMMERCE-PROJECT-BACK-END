import { Request, Response } from "express";
import { ISlider } from "../models/slider.model";
import productSliderService from "../services/product.slider.service";

export async function createSlider(req: Request, res: Response) {
  try {
    const path =
      req.file?.path != undefined ? req.file.path.replace(/\\/g, "/") : "";
    const slider: ISlider = {
      sliderName: req.body.sliderName,
      sliderURL: req.body.sliderURL,
      sliderImagePath: path,
      sliderDescription: req.body.sliderDescription,
    };

    const savedSlider = await productSliderService.createSlider(slider);
    res.json({ message: "Success", slider: savedSlider });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}

export async function getAllSliders(req: Request, res: Response) {
  try {
    const slider = await productSliderService.getAllSliders(
      req.query.sliderName?.toString(),
      req.query.pageSize?.toString(),
      req.query.page?.toString(),
    );
    res.json({ message: "succes", data: slider });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}

export async function getSliderById(req: Request, res: Response) {
  try {
    const slider = await productSliderService.getSliderById(req.params.id);
    return res.json({ message: "succes", data: slider });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}

export async function updateSliderById(req: Request, res: Response) {
  try {
    const path =
      req.file?.path != undefined ? req.file.path.replace(/\\/g, "/") : "";
    const slider = await productSliderService.updateSlider(
      req.params.id,
      req.body.sliderName,
      req.body.sliderDescription,
      req.body.sliderURL,
      path,
    );
    return res.json({ message: "succes", data: slider });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}

export async function deleteSliderById(req: Request, res: Response) {
  try {
    const slider = await productSliderService.deleteSlider(req.params.id);
    return res.json({ message: "succes", data: slider });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}
