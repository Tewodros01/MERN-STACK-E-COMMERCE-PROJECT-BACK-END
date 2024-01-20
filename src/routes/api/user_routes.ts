import { Router } from "express";
import { getAllUser, deletUser } from "../../controllers/user.controller";

const user_router: Router = Router();

user_router.get("/", getAllUser);
user_router.delete("/:id", deletUser);

export default user_router;
