import {
  ResponseObject,
  ResponseToolkit,
  Server,
  Request,
  ServerRoute,
} from "@hapi/hapi";
import Joi from "joi";
import { itemCreateSchema } from "../schemas/itemSchemas";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItemById,
} from "../controllers/itemController";
import { handleValidationError } from "../../../utils/validatiosnError";

export const itemRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return {
        ok: true,
      };
    },
  },
  {
    method: "GET",
    path: "/items",
    handler: getItems,
  },
  {
    method: "POST",
    path: "/items",
    options: {
      validate: {
        payload: itemCreateSchema,
        failAction: async (request, h, err) => {
          if (err instanceof Joi.ValidationError) {
            return handleValidationError(request, h, err);
          }
        },
      },
      handler: createItem,
    },
  },
  {
    method: "GET",
    path: "/items/{id}",
    handler: getItemById,
  },
  {
    method: "PUT",
    path: "/items/{id}",
    options: {
      validate: {
        payload: itemCreateSchema,
        failAction: async (request, h, err) => {
          if (err instanceof Joi.ValidationError) {
            return handleValidationError(request, h, err);
          }
        },
      },
    },
    handler: updateItem,
  },

  {
    method: "DELETE",
    path: "/items/{id}",
    handler: deleteItemById,
  },
];
