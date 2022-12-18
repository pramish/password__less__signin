import { IResponse } from "types/response";
import { ISignIn } from "./SignIn";

export interface IAuthService {
  signIn: ({ email, password }: ISignIn) => Promise<IResponse>;
  //   verifyUser: ({ email, hash }: IVerifyUser) => Promise<IResponse>;
}
