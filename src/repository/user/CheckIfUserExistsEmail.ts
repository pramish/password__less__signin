import { UserModel } from "./UserSchema";

import { Logger } from "../../logger";

import { StatusCode } from "../../constants/StatusCode";

import { IUserResponse, IUser } from "../../types/user";

export const CheckIfUserExistsEmail = async (
  email: string
): Promise<IUserResponse> => {
  try {
    Logger.info("Searching if an user already exists");

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      Logger.error("User doesn't exists.");
      return {
        message: "Please enter your correct credentials.",
        statusCode: StatusCode.S404,
        isSuccess: false,
      };
    }

    Logger.info("User exists.");

    return {
      message: "User found.",
      statusCode: StatusCode.S200,
      isSuccess: true,
      user,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: StatusCode.S500,
      isSuccess: false,
    };
  }
};
