import { Router } from "express";
import { authController } from "../../controllers/auth.controllers";

const auth_router: Router = Router();

auth_router.post("/", authController.login);

export default auth_router;
