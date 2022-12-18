import { StatusCode } from "../../constants/StatusCode";

import { CheckIfUserExistsEmail, UpdateUser } from "../../repository/user";
import { calculateTimeStampFromDate } from "../../utils/calculateTimeStampFromDate";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { ParseUserData } from "../../utils/parseUserData";

import {
  IUserService,
  IUserLookUp,
  IUserLookUpResponse,
  IUser,
} from "../../types/user";

export class UserService implements IUserService {
  userLookUp = async ({ email }: IUserLookUp): Promise<IUserLookUpResponse> => {
    const { message, statusCode, isSuccess, user } =
      await CheckIfUserExistsEmail(email);

    if (!isSuccess || !user) {
      return {
        isSuccess: false,
        message: "User not found",
        statusCode: StatusCode.S404,
      };
    }

    const verificationCode = generateVerificationCode();

    const parsedUserData = ParseUserData(user);

    const userDataToUpdate: IUser = {
      ...parsedUserData,
      verificationCode,
      verificationCodeExpiryTimeStamp: calculateTimeStampFromDate({
        number: 6,
        type: "HOURS",
      }),
    };

    const {
      isSuccess: isUpdateUserSuccess,
      message: updateUserMessage,
      statusCode: updateUserStatusCode,
    } = await UpdateUser(userDataToUpdate, user.email);

    if (!isUpdateUserSuccess) {
      return {
        message: updateUserMessage,
        statusCode: updateUserStatusCode,
        isSuccess: isUpdateUserSuccess,
      };
    }

    // TODO: Send verificationCode to the user via email.

    return {
      message,
      statusCode,
      isSuccess,
      verificationCode,
    };
  };
}
