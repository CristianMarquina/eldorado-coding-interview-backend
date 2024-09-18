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
/**
 * Interfaz para la configuración de la base de datos.
 * @typedef {Object} Config
 * @property {string} DB_USER - Usuario de la base de datos.
 * @property {string} DB_URL - URL del servidor de la base de datos.
 * @property {string} DB_NAME - Nombre de la base de datos.
 * @property {string} DB_PWD - Contraseña del usuario de la base de datos.
 * @property {number} DB_PORT - Puerto de conexión a la base de datos.
 */

/** @type {Config} */

const { DB_USER, DB_URL, DB_NAME, DB_PWD, DB_PORT }: Config = config;

/**
 * Pool de conexiones para la base de datos.
 * @type {pg.Pool}
 */
export const db = new Pool({
  user: DB_USER,
  host: DB_URL,
  database: DB_NAME,
  password: DB_PWD,
  port: DB_PORT,
});

/**
 * Función asíncrona para verificar y obtener una conexión a la base de datos.
 * @async
 * @returns {Promise<pg.PoolClient | null>} Retorna el cliente de conexión si la conexión es exitosa, o `null` si falla.
 */
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
