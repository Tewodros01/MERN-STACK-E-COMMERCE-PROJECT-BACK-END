import { Request, Response } from "express";
import authService from "../services/auth.service";

const authController = {
  login: async (req: Request, res: Response): Promise<any> => {
    try {
      const cookies = req.cookies;
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const foundUser = await authService.findUserByUserEmail(email);

      if (!foundUser) {
        return res.sendStatus(401);
      }

      const match = await authService.comparePassword(
        password,
        foundUser.password,
      );

      if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);

        const accessToken = authService.generateAccessToken(
          foundUser.email,
          roles,
        );
        const newRefreshToken = authService.generateRefreshToken(
          foundUser.email,
        );

        let newRefreshTokenArray = !cookies?.jwt
          ? foundUser.refreshToken
          : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
          const refreshToken = cookies.jwt;
          const foundToken =
            await authService.findUserByUserEmail(refreshToken);

          // Detected refresh token reuse!
          if (!foundToken) {
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
          }

          authService.clearRefreshTokenCookie(res);
        }

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        foundUser.token = accessToken;
        await foundUser.save();

        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: "success", data: foundUser });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
};

export { authController };
