import { sign } from "jsonwebtoken";

import { Logger } from "../../../logger";
import { StatusCode } from "../../../constants/StatusCode";
import { CONFIG } from "../../../config";

import { ISignIn, ISignInResponse } from "../../../types/auth/SignIn";
import { IUser } from "../../../types/user";

import { UpdateUser } from "../../user";
import { CheckIfUserExistsEmail } from "../../user/CheckIfUserExistsEmail";
import { checkIfTwoStringsAreEqual } from "../../../utils/checkIfTwoStringsAreEqual";
import { calculateTimeStampFromDate } from "../../../utils/calculateTimeStampFromDate";
import { ParseUserData } from "../../../utils/parseUserData";

export const SignInUser = async ({
  email,
  verificationCode,
}: ISignIn): Promise<ISignInResponse> => {
  Logger.info("Check if an user exists.");

  const { message, statusCode, isSuccess, user } = await CheckIfUserExistsEmail(
    email
  );

  if (!isSuccess || !user) {
    Logger.error("User does not exists.");
    return {
      message,
      statusCode,
      isSuccess,
    };
  }

  if (
    !checkIfTwoStringsAreEqual(
      verificationCode.toString(),
      user.verificationCode.toString()
    )
  ) {
    Logger.error("Incorrect verification code.");
    return {
      message: "Please enter correct verification code.",
      statusCode: StatusCode.S403,
      isSuccess: false,
    };
  }

  Logger.error("Generating a User token.");
  const userToken = sign(
    {
      userId: user._id,
      email: user.email,
    },
    CONFIG.PASSPORT_LOGIN_SECRET,
    {
      expiresIn: "6h",
    }
  );

  Logger.info("Saving user token, verification timestamp.");

  const parsedUserData = ParseUserData(user);

  const userDataToSave: IUser = {
    ...parsedUserData,
    token: userToken,
    verificationExpiryTimeStamp: calculateTimeStampFromDate({
      number: 6,
      type: "HOURS",
    }),
    verificationCode: 0,
    verificationCodeExpiryTimeStamp: 0,
  };

  const {
    isSuccess: isUpdateUserSuccess,
    message: updateUserMessage,
    statusCode: updateUserStatusCode,
  } = await UpdateUser(userDataToSave, user.email);

  if (!isUpdateUserSuccess) {
    return {
      isSuccess: isUpdateUserSuccess,
      message: updateUserMessage,
      statusCode: updateUserStatusCode,
    };
  }

  Logger.info("Returning a response with a token.");
  return {
    message: "Successfully logged in.",
    statusCode: StatusCode.S200,
    isSuccess: true,
    token: userToken,
  };
};
