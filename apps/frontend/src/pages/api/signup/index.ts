import cookie from "cookie";
import { constants } from "../../../constants";
import { sdk } from "../../../libs/graphql_request";
import type { ErrorResponseType } from "../../../libs/graphql_request/types";
import type { SignupHandlerType } from "./types";

const { JWT_TOKEN_COOKIE_NAME } = constants;

const signupHandler: SignupHandlerType = async (req, res) => {
  let responseErrorMessage = "";
  const oneDay = 60 * 60 * 24;
  let status = 200;
  let jwtToken = "";

  try {
    jwtToken = await sdk
      .signup({ signupData: req.body })
      .then((response) => response.signup.accessToken);
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

  if (jwtToken) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(JWT_TOKEN_COOKIE_NAME, jwtToken, {
        httpOnly: true,
        maxAge: oneDay,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
      })
    );
  }

  res.status(status).json({ success, ...errorObject });
};

export default signupHandler;
