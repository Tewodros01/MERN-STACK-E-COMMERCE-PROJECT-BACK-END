import { Router } from "express";
import {
  createSlider,
  getAllSliders,
  getSliderById,
  updateSliderById,
  deleteSliderById,
} from "../../controllers/product.slider.conrolers";
import uploadslider from "../../middleware/slider.uploads";

const slider_route: Router = Router();

slider_route.get("/", getAllSliders);
slider_route.post("/", uploadslider.single("image"), createSlider);
slider_route.get("/:id", getSliderById);
slider_route.put("/:id", uploadslider.single("image"), updateSliderById);
slider_route.delete("/:id", deleteSliderById);

export default slider_route;
