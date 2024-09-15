import Joi from "joi";

export const itemCreateSchema = Joi.object({
  name: Joi.string().min(1).max(64).required().messages({
    "string.empty": `"name" is required`,
    "string.min": `"name" must have at least 1 character`,
    "string.max": `"name" must have at most 64 characters`,
    "any.required": `"name" is required`,
  }),
  price: Joi.number().greater(0).required().messages({
    "number.greater": `"price" must be greater than 0`,
    "number.base": `"price" must be a number`,
    "any.required": `"price" is required`,
  }),
});
