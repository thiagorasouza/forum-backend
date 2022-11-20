import { Column, Model, Table } from "sequelize-typescript";
import { SequelizeConnection } from "./sequelizeConnection";

@Table
class ModelMock extends Model {
  @Column
  field!: string;
}

describe("SequelizeConnection Test Suite", () => {
  it("should be able to connect to the database", async () => {
    const connection = SequelizeConnection.connect([ModelMock]);
    await expect(connection).resolves.not.toThrow();
    await SequelizeConnection.disconnect();
  });

  it("should be able to disconnect from the database", async () => {
    await SequelizeConnection.connect([ModelMock]);
    const disconnection = SequelizeConnection.disconnect();
    expect(disconnection).resolves.not.toThrow();
  });
});
