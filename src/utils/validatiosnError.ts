// src/utils/validationErrorHandler.ts
import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

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
