import { RequestHandler, Request, Response } from "express";

import { Logger } from "../../../logger";
import { userInstance } from "../../../services";
import { IUserLookUp } from "../../../types/user";
import { validateEmail } from "../../../utils/validation";
import { StatusCode } from "../../../constants/StatusCode";

export const LookUpUser: RequestHandler = async (
  request: Request,
  response: Response
) => {
  Logger.info("Getting a request params");

  const userLookUpRequestBody: IUserLookUp = request.body;

  const { email } = userLookUpRequestBody;

  if (!email) {
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

  const { message, statusCode, isSuccess } = await userInstance.userLookUp({
    email,
  });

  return response.status(statusCode).json({
    message,
    statusCode,
    isSuccess,
  });
};
