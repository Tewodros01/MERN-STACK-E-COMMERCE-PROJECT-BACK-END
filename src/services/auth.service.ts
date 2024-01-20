import { Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel, IUserDocument } from "../models/user.model";

dotenv.config();
const pepper: any = process.env.BCRYPT_PASSWORD;
const access_token_secret: any = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret: any = process.env.refreshttokenService;

const authService = {
  findUserByUserEmail: async (email: string): Promise<IUserDocument | null> => {
    return UserModel.findOne({ email }).exec();
  },

  comparePassword: async (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    return bcrypt.compare(password + pepper, hashedPassword);
  },

  generateAccessToken: (email: string, roles: string[]): string => {
    return jwt.sign(
      {
        UserInfo: {
          email,
          roles,
        },
      },
      access_token_secret as Secret,
      { expiresIn: "10s" },
    );
  },

  generateRefreshToken: (email: string): string => {
    return jwt.sign({ email }, refresh_token_secret as Secret, {
      expiresIn: "15s",
    });
  },

  clearRefreshTokenCookie: (res: Response): void => {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  },
};

export default authService;
