/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();
// eslint-disable-next-line no-console
//console.info(`${chalk.green("[local]:")} ${process.env.ENV_NAME}`);
const DB_PORT = parseInt(process.env.DB_PORT || "5434", 10); // Valor por defecto
export default {
  DB_USER: process.env.DB_USER || "",
  DB_PWD: process.env.DB_PWD || "",
  DB_URL: process.env.DB_URL || "localhost",
  DB_NAME: process.env.DB_NAME || "",
  DB_PORT: DB_PORT,
};
