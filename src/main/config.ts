import { ModelCtor, SequelizeOptions } from "sequelize-typescript";

export const config = {
  testing: {
    db: (models: ModelCtor[]): SequelizeOptions => ({
      dialect: "sqlite",
      username: "root",
      password: "",
      storage: ":memory:",
      database: "tests",
      models,
      logging: false,
    }),
  },
  local: {
    db: (models: ModelCtor[]): SequelizeOptions => ({
      dialect: "postgres",
      database: "forum",
      username: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5432,
      models,
      logging: false,
    }),
  },
};
