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

/**
 * Define las rutas para el manejo de ítems en el servidor Hapi.
 * @type {ServerRoute[]}
 */
export const itemRoutes: ServerRoute[] = [
    /**
   * Ruta para verificar el estado del servidor.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'GET'.
   * @property {string} path - Ruta de la API, en este caso '/ping'.
   * @property {Function} handler - Función que maneja la solicitud y devuelve una respuesta.
   * @returns {Promise<ResponseObject>} Objeto de respuesta con un campo `ok` que indica que el servidor está funcionando.
   */
  {
    method: "GET",
    path: "/ping",
    handler: async (request, h) => {
      return {
        ok: true,
      };
    },
  },
    /**
   * Ruta para obtener todos los ítems.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'GET'.
   * @property {string} path - Ruta de la API, en este caso '/items'.
   * @property {Function} handler - Función que maneja la solicitud para obtener todos los ítems.
   * @returns {Promise<ResponseObject>} Lista de ítems.
   */
  {
    method: "GET",
    path: "/items",
    handler: getItems,
  },
  /**
   * Ruta para crear un nuevo ítem.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'POST'.
   * @property {string} path - Ruta de la API, en este caso '/items'.
   * @property {Object} options - Opciones adicionales para la ruta.
   * @property {Object} options.validate - Configuración de validación para la solicitud.
   * @property {Object} options.validate.payload - Esquema de validación para el cuerpo de la solicitud.
   * @property {Function} options.validate.failAction - Función para manejar errores de validación.
   * @property {Function} handler - Función que maneja la solicitud para crear un nuevo ítem.
   * @returns {Promise<ResponseObject>} Objeto de respuesta con el ítem creado.
   */
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
    /**
   * Ruta para obtener un ítem específico por su ID.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'GET'.
   * @property {string} path - Ruta de la API, en este caso '/items/{id}'.
   * @property {Function} handler - Función que maneja la solicitud para obtener un ítem por su ID.
   * @param {Object} request - Objeto de solicitud.
   * @param {Object} request.params - Parámetros de la solicitud.
   * @param {string} request.params.id - ID del ítem a obtener.
   * @returns {Promise<ResponseObject>} Objeto de respuesta con el ítem solicitado.
   */
  {
    method: "GET",
    path: "/items/{id}",
    handler: getItemById,
  },
    /**
   * Ruta para actualizar un ítem específico por su ID.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'PUT'.
   * @property {string} path - Ruta de la API, en este caso '/items/{id}'.
   * @property {Object} options - Opciones adicionales para la ruta.
   * @property {Object} options.validate - Configuración de validación para la solicitud.
   * @property {Object} options.validate.payload - Esquema de validación para el cuerpo de la solicitud.
   * @property {Function} options.validate.failAction - Función para manejar errores de validación.
   * @property {Function} handler - Función que maneja la solicitud para actualizar un ítem por su ID.
   * @param {Object} request - Objeto de solicitud.
   * @param {Object} request.params - Parámetros de la solicitud.
   * @param {string} request.params.id - ID del ítem a actualizar.
   * @returns {Promise<ResponseObject>} Objeto de respuesta con el ítem actualizado.
   */
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
  /**
   * Ruta para eliminar un ítem específico por su ID.
   * @memberof itemRoutes
   * @type {Object}
   * @property {string} method - Método HTTP, en este caso 'DELETE'.
   * @property {string} path - Ruta de la API, en este caso '/items/{id}'.
   * @property {Function} handler - Función que maneja la solicitud para eliminar un ítem por su ID.
   * @param {Object} request - Objeto de solicitud.
   * @param {Object} request.params - Parámetros de la solicitud.
   * @param {string} request.params.id - ID del ítem a eliminar.
   * @returns {Promise<ResponseObject>} Objeto de respuesta confirmando la eliminación del ítem.
   */
  {
    method: "DELETE",
    path: "/items/{id}",
    handler: deleteItemById,
  },
];
