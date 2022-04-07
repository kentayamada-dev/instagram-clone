import { getSerializedJwtCookie } from "../../../libs/cookie";
import type { TokenHandlerType } from "./types";

const tokenHandler: TokenHandlerType = (req, res) => {
  res.setHeader("Set-Cookie", getSerializedJwtCookie(req.body.jwtToken));
  res.status(200).end();
};

export default tokenHandler;
