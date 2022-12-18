import { StatusCode } from "../../constants";

export interface IResponse {
  statusCode: StatusCode;
  isSuccess: boolean;
  message: string;
}
