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
      .response({ id: item.id, name: item.name, price: item.price })
      .code(201);
  } catch (error) {
    console.error("Error creating item:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};

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
