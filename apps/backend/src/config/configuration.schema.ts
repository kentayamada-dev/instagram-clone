import Joi from "joi";

export interface ConfigSchema {
  readonly JWT_SECRET: string;
}

export const configSchema = Joi.object<ConfigSchema>({
  JWT_SECRET: Joi.string().required()
});
