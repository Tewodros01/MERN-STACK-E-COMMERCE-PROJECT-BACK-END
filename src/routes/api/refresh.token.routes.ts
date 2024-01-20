import { Router } from "express";
import { refreshTokenController } from "../../controllers/refresh.token.controller";

const refresh_router: Router = Router();

refresh_router.get("/", refreshTokenController.refreshToken);

export default refresh_router;
