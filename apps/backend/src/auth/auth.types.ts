export interface JwtToken {
  readonly accessToken: string;
}

export interface JwtPayload {
  readonly id: string;
}

export interface GqlContext {
  req: { user: JwtPayload };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any;
}
