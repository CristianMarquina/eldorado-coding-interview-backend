import { Request, ResponseToolkit } from "@hapi/hapi";
import { Item } from "../models/itemModel";

interface CreateItemPayload {
  name: string;
  price: number;
}
/**
 * Crea un nuevo item en la base de datos.
 * 
 * @param {Request} request - Objeto de solicitud HTTP, que contiene el payload con el nombre y precio del item.
 * @param {ResponseToolkit} h - Herramientas para construir una respuesta HTTP.
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con el item creado y código de estado 201, o un error en caso de fallo.
 */
export const createItem = async (request: Request, h: ResponseToolkit) => {
  const { name, price } = request.payload as CreateItemPayload;
  try {
    const item = await Item.create({ name, price });
    return h
      .response({ id: item.id, name: item.name, price: item.price })
      .code(201);
  } catch (error) {
    console.error("Error creating item:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};

/**
 * Obtiene todos los items que no han sido eliminados de la base de datos.
 * 
 * @param {Request} request - Objeto de solicitud HTTP.
 * @param {ResponseToolkit} h - Herramientas para construir una respuesta HTTP.
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con una lista de items o un mensaje de error en caso de fallo.
 */
export const getItems = async (request: Request, h: ResponseToolkit) => {
  try {
    const items = await Item.findAll({
      where: {
        is_deleted: null,
      },
      attributes: ["id", "name", "price"],
    });
    if (items.length === 0) {
      return h.response([]).code(200);
    }

    const formattedItems = items.map((item) => ({
      id: Number(item.id),
      name: item.name,
      price: item.price,
    }));
    return h.response(formattedItems).code(200);
  } catch (error) {
    console.error("Error get in items:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};
/**
 * Obtiene un item específico por su ID.
 * 
 * @param {Request} request - Objeto de solicitud HTTP que contiene el ID del item.
 * @param {ResponseToolkit} h - Herramientas para construir una respuesta HTTP.
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con el item solicitado o un mensaje de error en caso de que no se encuentre.
 */
export const getItemById = async (request: Request, h: ResponseToolkit) => {
  try {
    const id = Number(request.params.id);
    const item = await Item.findOne({
      where: { id, is_deleted: null },
    });

    if (!item) {
      return h.response({ error: "Item not found" }).code(404);
    }

    return h
      .response({ id: Number(item.id), name: item.name, price: item.price })
      .code(200);
  } catch (error) {
    console.error("Error get in items:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};
/**
 * Actualiza un item existente en la base de datos.
 * 
 * @param {Request} request - Objeto de solicitud HTTP que contiene el ID del item y el nuevo nombre y precio.
 * @param {ResponseToolkit} h - Herramientas para construir una respuesta HTTP.
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con el item actualizado o un mensaje de error si no se encuentra.
 */
export const updateItem = async (request: Request, h: ResponseToolkit) => {
  try {
    const id = Number(request.params.id);
    const { name, price } = request.payload as { name: string; price: number };

    const [updatedCount, [updatedItem]] = await Item.update(
      { name, price },
      {
        where: { id, is_deleted: null },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      return h
        .response({ error: "Item not found or already deleted" })
        .code(404);
    }

    return h
      .response({
        id: Number(updatedItem.id),
        name: updatedItem.name,
        price: updatedItem.price,
      })
      .code(200);
  } catch (error) {
    console.error("Error get in items:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};
/**
 * Elimina (marca como eliminado) un item por su ID.
 * 
 * @param {Request} request - Objeto de solicitud HTTP que contiene el ID del item.
 * @param {ResponseToolkit} h - Herramientas para construir una respuesta HTTP.
 * @returns {Promise<ResponseObject>} - Respuesta HTTP con código 204 si se elimina correctamente, o un mensaje de error si no se encuentra.
 */

export const deleteItemById = async (request: Request, h: ResponseToolkit) => {
  try {
    const id = Number(request.params.id);
    const item = await Item.findOne({
      where: { id, is_deleted: null },
    });

    if (!item) {
      return h.response({ error: "Item not found" }).code(404);
    }

    await Item.update(
      { is_deleted: true, deleteAt: new Date() },
      { where: { id } }
    );
    return h.response().code(204);
  } catch (error) {
    console.error("Error get in items:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};
