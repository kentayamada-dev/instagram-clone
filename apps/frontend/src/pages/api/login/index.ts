import { setCookie } from "nookies";
import { constants } from "../../../constants";
import { sdk } from "../../../libs/graphql_request";
import type { ErrorResponseType } from "../../../libs/graphql_request/types";
import type { LoginHandlerType } from "./types";

const { JWT_TOKEN_COOKIE_NAME } = constants;

const loginHandler: LoginHandlerType = async (req, res) => {
  let responseErrorMessage = "";
  const oneDay = 60 * 60 * 24;
  let status = 200;

  try {
    const jwtToken = await sdk
      .login({ loginData: req.body })
      .then((response) => response.login.accessToken);
    setCookie({ res }, JWT_TOKEN_COOKIE_NAME, jwtToken, {
      httpOnly: true,
      maxAge: oneDay,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });
  } catch (error) {
    const { message, status: errorStatus } = (error as ErrorResponseType)
      .response.errors[0].extensions.exception;
    responseErrorMessage = message;
    status = errorStatus;
  }
  /* eslint-disable camelcase, @typescript-eslint/naming-convention */
  const success = !responseErrorMessage;
  const errorObject = responseErrorMessage
    ? { error_message: responseErrorMessage }
    : {};
  /* eslint-enable camelcase, @typescript-eslint/naming-convention */

  res.status(status).json({ success, ...errorObject });
};

export default loginHandler;
