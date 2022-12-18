import { RequestHandler, Request, Response } from "express";

import { Logger } from "../../../../logger";
import { authInstance } from "../../../../services";
import { ISignIn } from "../../../../types/auth/SignIn";
import { validateEmail } from "../../../../utils/validation";
import { checkIfLengthIsEqual } from "../../../../utils/checkIfLengthIsEqual";
import { StatusCode } from "../../../../constants/StatusCode";

export const SignInController: RequestHandler = async (
  request: Request,
  response: Response
) => {
  Logger.info("Getting a request params");

  const signInRequestBody: ISignIn = request.body;

  const { email, verificationCode } = signInRequestBody;

  if (!email || !verificationCode) {
    Logger.error("Not all query parameters are passed.");
    return response.status(StatusCode.S400).json({
      success: false,
      message: "Please provide all of the required parameters.",
    });
  }

  Logger.info("Validating an email");
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    Logger.error("Invalid email.");
    return response.status(StatusCode.S400).json({
      success: false,
      message: "Your email is invalid. Please try again.",
    });
  }

  Logger.info("Validating verification code");
  const isVerificationCodeValid = checkIfLengthIsEqual(
    verificationCode.toString(),
    6
  );

  if (!isVerificationCodeValid) {
    Logger.error("Invalid verification code.");
    return response.status(StatusCode.S400).json({
      success: false,
      message: "Invalid verification code. Please try again.",
    });
  }

  const { message, statusCode, isSuccess } = await authInstance.signIn({
    email,
    verificationCode,
  });

  return response.status(statusCode).json({
    message,
    statusCode,
    isSuccess,
  });
};
