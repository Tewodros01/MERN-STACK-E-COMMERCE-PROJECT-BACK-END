import { Router } from "express";
import registerController from "../../controllers/register.controllers";

const register_router: Router = Router();

register_router.post("/", registerController.registerNewUser);

export default register_router;
