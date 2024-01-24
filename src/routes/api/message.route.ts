import { Router } from "express";
import messageController from "../../controllers/message.controller";
import { authenticationToken } from "../../middleware/auth";

const message_router: Router = Router();

message_router.get("/", authenticationToken, messageController.getAllMessages);
message_router.post("/", authenticationToken, messageController.addMessage);

export default message_router;
