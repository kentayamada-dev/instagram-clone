import { getSerializedJwtCookie } from "../../../libs/cookie";
import { sdk } from "../../../libs/graphql_request";
import { apiErrorHandler } from "../../../utils/handleApiError";
import type { ErrorObjectType } from "../../../utils/handleApiError/types";
import type { LoginHandlerType } from "./types";

const loginHandler: LoginHandlerType = async (req, res) => {
  let status = 200;
  let jwtToken = "";
  let errorObject: ErrorObjectType = {};

  try {
    jwtToken = await sdk
      .login({ loginData: req.body })
      .then((response) => response.login.accessToken);
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

export default loginHandler;
