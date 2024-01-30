import { Request, Response } from "express";
import registerService from "../services/register.service";
import { IUser } from "../models/user.model";

const registerController = {
  registerNewUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const userData: IUser = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: [],
        contact: "+251940805426",
        permissions: [],
      };

      if (
        !userData.fullName ||
        !userData.username ||
        !userData.email ||
        !userData.password
      ) {
        return res.status(400).json({
          message: "fullName , Username , email and password are required.",
        });
      }

      const isDuplicate = await registerService.checkDuplicateUsername(
        userData.username,
      );

      if (isDuplicate) {
        return res.sendStatus(409);
      }

      const result = await registerService.createUser(userData);

      console.log(result);

      res
        .status(201)
        .json({ success: `New user ${userData.username} created!` });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default registerController;
