import cookie from "cookie";
import { constants } from "../../constants";
import type { GetSerializedJwtCookieType } from "./types";

const { JWT_TOKEN_COOKIE_NAME } = constants;

export const getSerializedJwtCookie: GetSerializedJwtCookieType = (
  jwtToken
) => {
  const oneDay = 60 * 60 * 24;

  return cookie.serialize(JWT_TOKEN_COOKIE_NAME, jwtToken, {
    httpOnly: true,
    maxAge: oneDay,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};
