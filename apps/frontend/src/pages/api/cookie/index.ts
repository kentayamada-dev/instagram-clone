import { setCookie } from "nookies";
import type { CookieHandlerType } from "./types";

const cookieHandler: CookieHandlerType = (req, res) => {
  switch (req.method) {
    case "POST":
      setCookie({ res }, req.body.key, req.body.value, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
      });
      res.status(201).end();
      break;

    case "DELETE":
      setCookie({ res }, req.body.key, req.body.value, {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
      });
      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
};

export default cookieHandler;
