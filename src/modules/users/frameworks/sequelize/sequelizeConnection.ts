import { Sequelize } from "sequelize-typescript";

export class SequelizeConnection {
  static sequelize: Sequelize;

  static async connect(uri: string) {
    const connection = new Sequelize(uri, {
      models: [__dirname + "/models"],
      logging: false,
    });
    await connection.authenticate();
    SequelizeConnection.sequelize = connection;
  }

  static async sync() {
    await SequelizeConnection.sequelize.sync();
  }

  static async disconnect() {
    await SequelizeConnection.sequelize.close();
  }
}
