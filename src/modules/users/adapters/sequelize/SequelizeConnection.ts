import { ModelCtor, Sequelize } from "sequelize-typescript";

export class SequelizeConnection {
  static sequelize: Sequelize;

  static async connect(models: ModelCtor[]) {
    const connection = new Sequelize({
      database: "tests",
      dialect: "sqlite",
      username: "root",
      password: "",
      storage: ":memory:",
      models,
    });
    await connection.authenticate();
    SequelizeConnection.sequelize = connection;
  }

  static async disconnect() {
    await SequelizeConnection.sequelize.close();
  }
}
