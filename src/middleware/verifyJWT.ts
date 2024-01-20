import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

interface UserInfo {
  username: string;
  roles: string[];
}

interface CustomRequest extends Request {
  user?: string;
  roles?: string[];
}

const isJwtPayload = (decoded: JwtPayload | string): decoded is JwtPayload => {
  return (
    typeof decoded === "object" && decoded !== null && "UserInfo" in decoded
  );
};

const verifyJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void | Response<any> => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: Error | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      if (
        !isJwtPayload(decoded!) ||
        !decoded.UserInfo ||
        !decoded.UserInfo.username ||
        !decoded.UserInfo.roles
      ) {
        return res.sendStatus(403); // Malformed token
      }

      const userInfo: UserInfo = decoded.UserInfo;
      req.user = userInfo.username;
      req.roles = userInfo.roles;

      next();
    },
  );
};

export default verifyJWT;
