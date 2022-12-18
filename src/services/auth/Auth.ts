import { SignInUser } from "../../repository/auth/SignIn";

import { SignUp } from "../../repository/auth/SignUp";

import { IAuthService } from "../../types/auth";
import { ISignIn, ISignInResponse } from "../../types/auth/SignIn";
import { ISignUp } from "../../types/auth/SignUp";
import { IResponse } from "../../types/response";

export class AuthService implements IAuthService {
  signUp = async ({ email }: ISignUp): Promise<IResponse> => {
    const { isSuccess, message, statusCode } = await SignUp({ email });

    return {
      isSuccess,
      message,
      statusCode,
    };
  };
  signIn = async ({
    email,
    verificationCode,
  }: ISignIn): Promise<ISignInResponse> => {
    const { message, statusCode, isSuccess, token } = await SignInUser({
      email,
      verificationCode,
    });

    return {
      message,
      statusCode,
      isSuccess,
      token,
    };
  };
}
