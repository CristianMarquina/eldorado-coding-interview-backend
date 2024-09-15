import pg from "pg";
const { Pool } = pg;

import config from "../../config";
interface Config {
  DB_USER: string;
  DB_URL: string;
  DB_NAME: string;
  DB_PWD: string;
  DB_PORT: number;
}

const { DB_USER, DB_URL, DB_NAME, DB_PWD, DB_PORT }: Config = config;

// Crear el pool de conexión
export const db = new Pool({
  user: DB_USER,
  host: DB_URL,
  database: DB_NAME,
  password: DB_PWD,
  port: DB_PORT,
});

// Función para verificar la conexión
export const conn = async () => {
  try {
    const client = await db.connect();
    console.log(`[SERVER]: Database connected successfully`);
    return client; // Retorna el cliente de la conexión
  } catch (error) {
    console.error(`[ERROR]: Failed to connect to database`);
    console.error(error);
    return null; // Retorna null para manejar la conexión fallida sin finalizar el proceso
  }
};

export default conn;
