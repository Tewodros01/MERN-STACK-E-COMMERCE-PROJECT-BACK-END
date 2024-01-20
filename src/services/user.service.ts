import { IUser, IUserDocument, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { MONGO_DB_CONFIG } from "../config/app.config";
import * as auth from "../middleware/auth";

const userService = {
  getAllUser: async (params: {
    pageSize?: string;
    page?: string;
  }): Promise<IUserDocument[]> => {
    try {
      const perPage =
        Math.abs(parseInt(params.pageSize ?? "")) || MONGO_DB_CONFIG.PAGE_SIZE;
      const page = (Math.abs(parseInt(params.page ?? "")) || 1) - 1;
      const users = await UserModel.find()
        .limit(perPage)
        .skip(perPage * page);
      return users;
    } catch (err) {
      throw new Error(`Could not get users ${err}`);
    }
  },

  deletUser: async (id: String): Promise<IUserDocument> => {
    try {
      console.log(id);
      const deletedUser = await UserModel.findByIdAndDelete(id).lean();
      return deletedUser as IUserDocument;
    } catch (err) {
      throw new Error(`Could not dlete ${err}`);
    }
  },
};

export default userService;
