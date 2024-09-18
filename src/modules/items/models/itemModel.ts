import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../db/conn"; // Importa la instancia del pool de conexiones
import { Sequelize } from "sequelize";

import config from "../../../../config";
interface Config {
  DB_USER: string;
  DB_URL: string;
  DB_NAME: string;
  DB_PWD: string;
  DB_PORT: number;
}

const { DB_USER, DB_URL, DB_NAME, DB_PWD, DB_PORT }: Config = config;


/**
 * Inicializa una instancia de Sequelize para conectarse a la base de datos PostgreSQL.
 * Configura los parámetros de conexión de la base de datos, incluyendo el pool de conexiones.
 */

const sequelize = new Sequelize({
  dialect: "postgres",
  database: DB_NAME,
  username: DB_USER,
  password: DB_PWD,
  host: DB_URL,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

/**
 * Interfaz que representa los atributos de un Item.
 * @typedef {Object} ItemAttributes
 * @property {number} id - Identificador único para cada ítem.
 * @property {string} name - Nombre del ítem, entre 1 y 64 caracteres.
 * @property {number} price - Precio del ítem, debe ser mayor que 0.
 * @property {boolean} [is_deleted] - Indicador de eliminación lógica para eliminaciones suaves (opcional).
 * @property {Date} createdAt - Marca de tiempo cuando se creó el ítem.
 * @property {Date} updatedAt - Marca de tiempo de la última actualización del ítem.
 * @property {Date} [deleteAt] - Marca de tiempo cuando se eliminó el ítem (opcional).
 */
interface ItemAttributes {
  id: number;
  name: string;
  price: number;
  is_deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}
/**
 * Interfaz para la creación de un nuevo Item, donde 'id' es opcional ya que se auto-incrementa.
 * @typedef {ItemAttributes} ItemCreationAttributes
 */
interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}

export class Item extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public is_deleted?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public deleteAt?: Date;
}
/**
 * Configura el modelo de Item con los atributos y opciones necesarias.
 * @param {Object} attributes - Los atributos del modelo de Item.
 * @param {Object} options - Opciones para la configuración del modelo.
 * @param {Sequelize} options.sequelize - La instancia de Sequelize utilizada para la conexión.
 * @param {string} options.tableName - Nombre de la tabla en la base de datos.
 * @param {boolean} options.timestamps - Indica si el modelo debe utilizar marcas de tiempo (timestamps).
 */
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for each item",
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1, 64],
      },
      comment: "Name of the item, must be between 1 and 64 characters",
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0.01,
      },
      comment: "Price of the Item, must be greater than 0.",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      comment: "Logical deletion flag for the item, used for soft deletes",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Timestamp of when the item was created",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Timestamp of the last update of the item",
    },
    deleteAt: {
      type: DataTypes.DATE,
      comment: "Timestamp of when the item was deleted",
    },
  },
  {
    sequelize,
    tableName: "items",
    timestamps: true,
  }
);

export default Item;
