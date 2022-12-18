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

export interface IUserLookUp {
  email: string;
}
export interface IUserLookUpResponse extends IResponse {
  verificationCode?: number;
}

export interface IUserResponse extends IResponse {
  user?: IUser;
}

export interface IUserService {
  userLookUp: ({ email }: IUserLookUp) => Promise<IUserLookUpResponse>;
}
