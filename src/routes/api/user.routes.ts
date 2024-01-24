import { Router } from "express";
import userController from "../../controllers/user.controller";

const user_router: Router = Router();

user_router.get("/", userController.getAllUser);
user_router.delete("/:id", userController.deletUser);

export default user_router;
