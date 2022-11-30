import { Sequelize } from "sequelize-typescript";

export class SequelizeConnection {
  static sequelize: Sequelize;

  static async connect() {
    const connection = new Sequelize({
      database: "tests",
      dialect: "sqlite",
      username: "root",
      password: "",
      storage: ":memory:",
      models: [__dirname + "/models"],
      logging: false,
    });
    await connection.authenticate();
    SequelizeConnection.sequelize = connection;
  }

  static async disconnect() {
    await SequelizeConnection.sequelize.close();
  }
}
