import { IResponse } from "types/response";
import { ISignIn } from "./SignIn";
import { ISignUp } from "./SignUp";

export interface IAuthService {
  signIn: ({ email, verificationCode }: ISignIn) => Promise<IResponse>;
  signUp: ({ email }: ISignUp) => Promise<IResponse>;
}
