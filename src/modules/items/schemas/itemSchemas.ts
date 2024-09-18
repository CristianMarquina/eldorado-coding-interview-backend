import Joi from "joi";

/**
 * Esquema de validación para la creación de un ítem.
 * @constant {Joi.ObjectSchema}
 * @property {Joi.StringSchema} name - Nombre del ítem. Debe tener entre 1 y 64 caracteres y es obligatorio.
 * @property {Joi.NumberSchema} price - Precio del ítem. Debe ser un número mayor que 0 y es obligatorio.
 * 
 * @example
 * const result = itemCreateSchema.validate({ name: 'ItemName', price: 10.5 });
 * if (result.error) {
 *   // Manejar error de validación
 * }
*/

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
