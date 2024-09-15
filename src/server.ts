import Hapi from "@hapi/hapi";
import { defineRoutes } from "./routes";
import config from "../config";
import { conn } from "./db/conn";

const getServer = () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  defineRoutes(server);

  return server;
};

export const initializeServer = async () => {
  const server = getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const server = getServer();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  console.log("config");
  console.log(config);
  console.log("conn");
  conn();

  return server;
};
