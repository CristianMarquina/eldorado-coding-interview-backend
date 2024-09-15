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

interface ItemAttributes {
  id: number;
  name: string;
  price: number;
  is_deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}

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
/*export class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public is_deleted?: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deleteAt?: Date;
}*/

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
