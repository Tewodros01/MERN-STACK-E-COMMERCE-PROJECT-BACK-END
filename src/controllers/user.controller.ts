import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  getAllUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const allUser = await userService.getAllUser({
        pageSize: req.query.pageSize?.toString(),
        page: req.query.page?.toString(),
      });
      res.json({ message: "success", data: allUser });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },

  deletUser: async (req: Request, res: Response) => {
    try {
      console.log(req.params.id);
      const user = await userService.deletUser(req.params.id);
      res.json({ message: "success", data: user });
    } catch (err) {
      res.status(400).json({ message: "error", error: `${err}` });
    }
  },
};

export default userController;
