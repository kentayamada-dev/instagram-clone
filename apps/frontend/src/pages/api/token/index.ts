import { setCookie } from "nookies";
import type { TokenHandlerType } from "./types";

const tokenHandler: TokenHandlerType = (req, res) => {
  setCookie({ res }, "accessToken", req.body.token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
  res.status(200).end();
};

export default tokenHandler;
