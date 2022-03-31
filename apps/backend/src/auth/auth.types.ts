export interface JwtToken {
  readonly accessToken: string;
}

export interface JwtPayload {
  readonly email: string;
}
