import Joi from "joi";

export const itemCreateSchema = Joi.object({
  name: Joi.string().min(1).max(64).required().messages({
    "string.empty": `Field "name" is required`,
    "string.min": `Field "name" must have at least 1 character`,
    "string.max": `Field "name" must have at most 64 characters`,
    "any.required": `Field "name" is required`,
  }),
  price: Joi.number().greater(0).required().messages({
    "number.greater": `Field "price" cannot be negative`,
    "number.base": `Field "price" must be a number`,
    "any.required": `Field "price" is required`,
  }),
});
