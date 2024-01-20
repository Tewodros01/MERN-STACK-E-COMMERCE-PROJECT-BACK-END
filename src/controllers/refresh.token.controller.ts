import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import refreshTokenService from "../services/referesh.token.service";
import { AccessTokenResponse } from "../interface/access_token_response.interface";

const refreshTokenController = {
  refreshToken: async (
    req: Request,
    res: Response,
  ): Promise<void | Response<AccessTokenResponse>> => {
    try {
      const cookies = req.cookies;

      if (!cookies?.jwt) {
        return res.sendStatus(401);
      }

      const refreshToken = cookies.jwt;
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      const foundUser =
        await refreshTokenService.verifyRefreshToken(refreshToken);

      if (!foundUser) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as Secret,
          async (
            err: Error | null,
            decoded: JwtPayload | string | undefined,
          ) => {
            if (err) {
              return res.sendStatus(403); // Forbidden
            }

            if (typeof decoded === "string") {
              await refreshTokenService.deleteHackedUserRefreshToken(decoded);
              return res.sendStatus(403); // Forbidden
            }

            await refreshTokenService.deleteHackedUserRefreshToken(decoded);
          },
        );

        return res.sendStatus(403); // Forbidden
      }

      const newRefreshTokenArray = foundUser.refreshToken.filter(
        (rt) => rt !== refreshToken,
      );

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        async (err: Error | null, decoded: JwtPayload | string | undefined) => {
          if (err) {
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
          }

          if (typeof decoded === "string" || !decoded?.username) {
            return res.sendStatus(403);
          }

          const roles = Object.values(foundUser.roles);
          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: decoded.username,
                roles: roles,
              },
            },
            process.env.ACCESS_TOKEN_SECRET as Secret,
            { expiresIn: "10s" },
          );

          const newRefreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET as Secret,
            { expiresIn: "15s" },
          );

          foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
          await foundUser.save();

          res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
          });

          res.json({ accessToken });
        },
      );
    } catch (error) {
      console.error(error);
      return res.sendStatus(500); // Internal Server Error
    }
  },
};

export { refreshTokenController };
