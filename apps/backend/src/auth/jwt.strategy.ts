import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { ConfigSchema } from "../utils/config/config.schema";
import type { Cookies } from "./auth.types";
import type { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties, @typescript-eslint/prefer-readonly-parameter-types
    protected readonly configService: ConfigService<ConfigSchema>
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        (request: Request): string | null => {
          const { access_token: accessToken } = request.cookies as Cookies;

          if (!accessToken) {
            return null;
          }

          return accessToken;
        }
      ]),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      secretOrKey: configService.get("JWT_SECRET")
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected validate(payload: unknown): unknown {
    return payload;
  }
}
