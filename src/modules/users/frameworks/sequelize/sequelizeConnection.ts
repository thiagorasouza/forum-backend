import { Sequelize } from "sequelize-typescript";
import { config } from "../../../../main/config";

export class SequelizeConnection {
  static sequelize: Sequelize;

  static async connect() {
    const connection = new Sequelize(config.getSequelizeUri(), {
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
