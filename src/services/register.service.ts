import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserModel, IUserDocument, IUser } from "../models/user.model";

dotenv.config();
const pepper: any = process.env.BCRYPT_PASSWORD;
const saltRound: any = process.env.SALT_ROUNDS;

const registerService = {
  checkDuplicateUsername: async (username: string): Promise<boolean> => {
    const duplicate = await UserModel.findOne({ username }).exec();
    return !!duplicate;
  },

  createUser: async (userData: IUser): Promise<IUserDocument> => {
    const hashedPassword = await bcrypt.hash(
      userData.password + pepper,
      parseInt(saltRound),
    );

    const user = new UserModel({
      fullName: userData.fullName,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    return user.save();
  },
};

export default registerService;
