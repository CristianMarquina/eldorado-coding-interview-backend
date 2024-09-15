import {
  ResponseObject,
  ResponseToolkit,
  Server,
  Request,
  ServerRoute,
} from "@hapi/hapi";
import { itemCreateSchema } from "../schemas/itemSchemas";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
} from "../controllers/itemController";

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
          //console.error("ValidationError:", err);
          return h.response({ message: err?.message }).code(400).takeover();
        },
      },
    },
    handler: createItem,
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
          //console.error("ValidationError:", err);
          return h.response({ message: err?.message }).code(400).takeover();
        },
      },
    },
    handler: updateItem,
  },
];
