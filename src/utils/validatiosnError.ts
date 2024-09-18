import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

/**
 * Maneja los errores de validación de Joi y retorna una respuesta con el error formateado.
 * 
 * @param {Request} request - Objeto que representa la solicitud HTTP.
 * @param {ResponseToolkit} h - Objeto que proporciona métodos para construir una respuesta HTTP.
 * @param {Joi.ValidationError} err - Objeto de error de validación generado por Joi.
 * 
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con el error formateado y un código de estado 400.
 * 
 * @example
 * const error = new Joi.ValidationError('Validation Error', [...], { ... });
 * return handleValidationError(request, h, error);
 */
export const handleValidationError = async (
  request: Request,
  h: ResponseToolkit,
  err: Joi.ValidationError
) => {
  const match = err?.message.match(/"(.*?)"/);
  const errorMessage = err?.message.replace(/\\\"/g, "");
  return h
    .response({
      errors: [
        {
          field: `${match ? match[1] : null}`,
          message: errorMessage,
        },
      ],
    })
    .code(400)
    .takeover();
};
