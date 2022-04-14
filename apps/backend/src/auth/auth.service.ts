import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { JwtPayload, JwtToken } from "./auth.types";

@Injectable()
export class AuthService {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    private readonly jwtService: JwtService
  ) {}

  public getJwtToken(id: string): JwtToken {
    const payload: JwtPayload = { id };

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
