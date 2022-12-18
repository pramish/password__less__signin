import { UserModel } from "../../user/UserSchema";
import { StatusCode } from "../../../constants/StatusCode";

import { CheckIfUserExistsEmail } from "../../user/CheckIfUserExistsEmail";

import { ISignUp } from "../../../types/auth/SignUp";
import { IResponse } from "../../../types/response";

export const SignUp = async ({ email }: ISignUp): Promise<IResponse> => {
  try {
    const { isSuccess } = await CheckIfUserExistsEmail(email);

    if (isSuccess) {
      return {
        isSuccess: false,
        message: "User exists.",
        statusCode: StatusCode.S401,
      };
    }

    const newUserModel = new UserModel({
      email,
    });

    const userSaved = await newUserModel.save();

    if (!userSaved._id) {
      return {
        isSuccess: false,
        message: "Cannot create user.",
        statusCode: StatusCode.S403,
      };
    }

    return {
      isSuccess: true,
      message: "Successfully created user.",
      statusCode: StatusCode.S200,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Internal server error",
      statusCode: StatusCode.S500,
    };
  }
};
