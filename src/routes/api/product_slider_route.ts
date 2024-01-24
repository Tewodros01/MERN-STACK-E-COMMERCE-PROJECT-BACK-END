import { Router } from "express";
import productSliderConrollers from "../../controllers/product.slider.conrollers";
import uploadslider from "../../middleware/slider.uploads";

const product_slider_route: Router = Router();

product_slider_route.get("/", productSliderConrollers.getAllSliders);
product_slider_route.post(
  "/",
  uploadslider.single("image"),
  productSliderConrollers.createSlider,
);
product_slider_route.get("/:id", productSliderConrollers.getSliderById);
product_slider_route.put(
  "/:id",
  uploadslider.single("image"),
  productSliderConrollers.updateSliderById,
);
product_slider_route.delete("/:id", productSliderConrollers.deleteSliderById);

export default product_slider_route;
