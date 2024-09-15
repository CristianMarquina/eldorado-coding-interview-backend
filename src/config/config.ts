import configEnv from "../../config";
import { Dialect } from "sequelize";

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const development: DbConfig = {
  username: configEnv.DB_USER,
  password: configEnv.DB_PWD,
  database: configEnv.DB_NAME,
  host: configEnv.DB_URL,
  dialect: "postgres",
};

const test: DbConfig = {
  username: configEnv.DB_USER,
  password: configEnv.DB_PWD,
  database: configEnv.DB_NAME,
  host: configEnv.DB_URL,
  dialect: "postgres",
};

const production: DbConfig = {
  username: configEnv.DB_USER,
  password: configEnv.DB_PWD,
  database: configEnv.DB_NAME,
  host: configEnv.DB_URL,
  dialect: "postgres",
};

// Exporta las configuraciones por entorno
export default { development, test, production };
