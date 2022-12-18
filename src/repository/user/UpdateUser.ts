import { UserModel } from "./UserSchema";
import { StatusCode } from "../../constants/StatusCode";

import { IUser } from "../../types/user";
import { IResponse } from "../../types/response";

export const UpdateUser = async (
  userDataToSave: IUser,
  email: string
): Promise<IResponse> => {
  try {
    const { acknowledged } = await UserModel.updateOne(
      { email },
      userDataToSave
    );

    if (!acknowledged) {
      return {
        isSuccess: false,
        message: "Cannot update user. Please try again later.",
        statusCode: StatusCode.S400,
      };
    }

    return {
      isSuccess: true,
      message: "User updated",
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
