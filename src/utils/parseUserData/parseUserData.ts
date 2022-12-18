import { IUser } from "../../types/user";

export const ParseUserData = (userRawData: IUser): IUser => {
  const {
    _id,
    email,
    fullName,
    token,
    verificationCode,
    verificationCodeExpiryTimeStamp,
    verificationExpiryTimeStamp,
  } = userRawData;

  return {
    _id,
    email,
    fullName,
    token,
    verificationCode,
    verificationCodeExpiryTimeStamp,
    verificationExpiryTimeStamp,
  };
};
