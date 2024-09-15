module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(chalk|@hapi/hapi|joi|dotenv|node-pg-migrate|pg|pg-hstore|sequelize)/)",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      useESM: true,
    },
  },
};
