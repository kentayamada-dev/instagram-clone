import { destroyCookie } from "nookies";
import { constants } from "../../../constants";
import type { LogoutHandlerType } from "./types";

const { JWT_TOKEN_COOKIE_NAME } = constants;

const logoutHandler: LogoutHandlerType = (_, res) => {
  destroyCookie({ res }, JWT_TOKEN_COOKIE_NAME, { path: "/" });
  res.status(200).json({ success: true });
};

export default logoutHandler;
