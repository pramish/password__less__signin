import { IResponse } from "../response";

export interface IUser {
  _id?: string;
  email: string;
  fullName: string;
  verificationCode: number;
  verificationCodeExpiryTimeStamp: number;
  token: string;
  verificationExpiryTimeStamp: number;
}

export interface IUserResponse extends IResponse {
  user?: IUser;
}
