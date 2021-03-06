/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["UPPER_CASE"] } ]*/

import Joi from "joi";

export interface ConfigSchema {
  readonly FRONTEND_ORIGIN: string;
  readonly JWT_SECRET: string;
}

export const configSchema = Joi.object<ConfigSchema>({
  FRONTEND_ORIGIN: Joi.string().required(),
  JWT_SECRET: Joi.string().required()
});
