import { UserModel, IUserDocument } from "../models/user.model";

const refreshTokenService = {
  verifyRefreshToken: async (
    refreshToken: string,
  ): Promise<IUserDocument | null> => {
    return UserModel.findOne({ refreshToken }).exec();
  },

  deleteHackedUserRefreshToken: async (decoded: any): Promise<void> => {
    const hackedUser = await UserModel.findOne({
      username: decoded.username,
    }).exec();

    if (hackedUser) {
      hackedUser.refreshToken = [];
      await hackedUser.save();
    }
  },
};

export default refreshTokenService;
