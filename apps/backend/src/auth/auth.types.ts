export interface JwtToken {
  readonly accessToken: string;
}

export interface JwtPayload {
  readonly email: string;
}

export interface JwtType {
  readonly message: string;
}

export interface GqlContext {
  req: { user: JwtPayload };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any;
}

export interface Cookies {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly access_token: string;
}

export type CookiesKey = keyof Cookies;
