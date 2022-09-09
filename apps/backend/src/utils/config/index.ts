/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["UPPER_CASE"] } ]*/

import Joi from "joi";

export interface ConfigSchema {
  DATABASE_URL: string;
  FRONTEND_ORIGIN: string;
  JWT_SECRET: string;
}

export const configSchema = Joi.object<ConfigSchema>({
  DATABASE_URL: Joi.string().required(),
  FRONTEND_ORIGIN: Joi.string().required(),
  JWT_SECRET: Joi.string().required()
});
