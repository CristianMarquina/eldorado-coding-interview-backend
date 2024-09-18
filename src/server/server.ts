import Hapi from "@hapi/hapi";
import { itemRoutes } from "../modules/items/routes/itemRoutes";
import config from "../../config";
import { conn } from "../db/conn";

/**
 * Función que crea y configura el servidor Hapi.
 * 
 * @returns {Hapi.Server} - Instancia del servidor Hapi configurada con prefijos de ruta y rutas de items.
 */
const getServer = () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: 3000,
  });
  server.realm.modifiers.route.prefix = "/api/v1";
  itemRoutes.forEach((route) => server.route(route));

  return server;
};

/**
 * Inicializa el servidor Hapi sin iniciarlo para escuchar peticiones.
 * 
 * @returns {Promise<Hapi.Server>} - Instancia del servidor Hapi después de la inicialización.
 */
export const initializeServer = async () => {
  const server = getServer();
  await server.initialize();
  return server;
};

/**
 * Inicia el servidor Hapi y establece una conexión con la base de datos.
 * 
 * @returns {Promise<Hapi.Server>} - Instancia del servidor Hapi después de iniciar.
 */
export const startServer = async () => {
  const server = getServer();
  await server.start();
  conn();
  return server;
};
