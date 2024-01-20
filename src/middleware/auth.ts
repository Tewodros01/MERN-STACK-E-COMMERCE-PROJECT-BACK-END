import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { MONGO_DB_CONFIG } from "../config/app.config";

const secret = MONGO_DB_CONFIG.TOKEN_KEY;

interface IRequest extends Request {
  user?: IUser;
}

interface ITokenData {
  data: IUser;
}

function authenticationToken(req: IRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No Token Provider" });
  }

  try {
    const decodedToken = jwt.verify(token, secret as Secret) as ITokenData;
    req.user = decodedToken.data;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
}

function generateAccessToken(user: IUser): string {
  const tokenData: ITokenData = { data: user };
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const expiresIn = "10s";

  return jwt.sign(tokenData, secret, { expiresIn });
}

function generateRefreshToken(user: IUser): string {
  const tokenData: ITokenData = { data: user };
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  const expiresIn = "15s";

  return jwt.sign(tokenData, secret, { expiresIn });
}

function clearRefreshTokenCookie(res: Response): void {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
}

export {
  authenticationToken,
  generateAccessToken,
  generateRefreshToken,
  clearRefreshTokenCookie,
};
