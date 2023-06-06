import * as Joi from "joi";

export const dbValidationSchema = Joi.object({
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_CONNECTION: Joi.string().required(),
})