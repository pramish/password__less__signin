import { IResponse } from "types/response";

export interface ISignIn {
  email: string;
  verificationCode: number;
}

export interface ISignInResponse extends IResponse {
  token?: string;
}
