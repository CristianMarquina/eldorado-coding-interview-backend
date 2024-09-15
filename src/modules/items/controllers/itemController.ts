import { Request, ResponseToolkit } from "@hapi/hapi";
import { Item } from "../models/itemModel";

interface CreateItemPayload {
  name: string;
  price: number;
}

export const createItem = async (request: Request, h: ResponseToolkit) => {
  const { name, price } = request.payload as CreateItemPayload;
  try {
    const item = await Item.create({ name, price });
    return h
      .response({ message: "item created sucefully", data: { id: item.id } })
      .code(200);
  } catch (error) {
    console.error("Error creating item:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};

export const getItems = async (request: Request, h: ResponseToolkit) => {
  try {
    // Crear el item solo con los atributos necesarios
    const items = await Item.findAll({
      where: {
        is_deleted: null,
      },
      attributes: ["id", "name", "price"],
    });
    return h.response(items).code(200);
  } catch (error) {
    console.error("Error get in items:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};
/*import { Request, ResponseToolkit } from "@hapi/hapi";
import { Item } from "../models/itemModel";

export const getAllItems = async (request: Request, h: ResponseToolkit) => {
  const items = await Item.findAll({
    where: {
      is_deleted: false,
    },
  });
  return h.response(items).code(200);
};

export const createItem = async (request: Request, h: ResponseToolkit) => {
  const { name, price } = request.payload as { name: string; price: number };
  if (price < 0.01) {
    return h.response({ errors: [{ field: 'price', message: 'Field "price" cannot be negative' }] }).code(400);
  }
  const item = await Item.create({ name, price });
  return h.response(item).code(201);
};

export const updateItem = async (request: Request, h: ResponseToolkit) => {
  const id = Number(request.params.id);
  const { name, price } = request.payload as { name: string; price: number };

  if (price < 0.01) {
    return h.response({ errors: [{ field: 'price', message: 'Field "price" cannot be negative' }] }).code(400);
  }

  const [updated] = await Item.update({ name, price }, {
    where: { id },
    returning: true,
  });

  if (!updated) {
    return h.response({ error: 'Item not found' }).code(404);
  }

  const updatedItem = await Item.findByPk(id);
  return h.response(updatedItem).code(200);
};

export const deleteItem = async (request: Request, h: ResponseToolkit) => {
  const id = Number(request.params.id);
  const item = await Item.findByPk(id);

  if (!item) {
    return h.response({ error: 'Item not found' }).code(404);
  }

  await Item.update({ is_deleted: true, deleteAt: new Date() }, { where: { id } });
  return h.response().code(204);
};

export const getItemById = async (request: Request, h: ResponseToolkit) => {
  const id = Number(request.params.id);
  const item = await Item.findOne({
    where: { id, is_deleted: false },
  });

  if (!item) {
    return h.response({ error: 'Item not found' }).code(404);
  }

  return h.response(item).code(200);
};
 */
