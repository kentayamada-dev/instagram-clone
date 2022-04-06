import { getSerializedJwtCookie } from "../../../libs/cookie";
import { sdk } from "../../../libs/graphql_request";
import { apiErrorHandler } from "../../../utils/handleApiError";
import type { ErrorObjectType } from "../../../utils/handleApiError/types";
import type { SignupHandlerType } from "./types";

const signupHandler: SignupHandlerType = async (req, res) => {
  let status = 200;
  let jwtToken = "";
  let errorObject: ErrorObjectType = {};

  try {
    jwtToken = await sdk
      .signup({ signupData: req.body })
      .then((response) => response.signup.accessToken);
  } catch (error) {
    const { errorObject: apiErrorObject, errorStatus } = apiErrorHandler(error);
    status = errorStatus;
    errorObject = apiErrorObject;
  }

  const responseStatus = res.status(status);

  if (jwtToken) {
    res.setHeader("Set-Cookie", getSerializedJwtCookie(jwtToken));
    responseStatus.end();
  } else {
    responseStatus.json({ ...errorObject });
  }
};

export default signupHandler;
