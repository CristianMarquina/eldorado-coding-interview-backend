import dotenv from "dotenv";

dotenv.config();

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  port: 5434,
  dialect: "postgres",
};

const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  port: 5434,
  dialect: "postgres",
};

const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  port: 5434,
  dialect: "postgres",
};

export default { development, test, production };
