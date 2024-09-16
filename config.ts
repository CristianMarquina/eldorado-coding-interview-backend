import dotenv from "dotenv";

dotenv.config();
const DB_PORT = parseInt(process.env.DB_PORT || "5434", 10); 
export default {
  DB_USER: process.env.DB_USER || "",
  DB_PWD: process.env.DB_PWD || "",
  DB_URL: process.env.DB_URL || "my_postgres_db",
  DB_NAME: process.env.DB_NAME || "",
  DB_PORT: DB_PORT,
};
