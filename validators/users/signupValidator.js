import Joi from "joi";

export const schemaIsRequired = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
