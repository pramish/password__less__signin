import { SignInUser } from "../../repository/auth/SignIn";

import { ISignIn, ISignInResponse } from "../../types/auth/SignIn";

import { IAuthService } from "../../types/auth";

export class AuthService implements IAuthService {
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
