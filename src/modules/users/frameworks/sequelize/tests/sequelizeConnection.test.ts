import { SequelizeConnection } from "../sequelizeConnection";

describe("SequelizeConnection Test Suite", () => {
  it("should be able to connect to the database", async () => {
    const connection = SequelizeConnection.connect();
    await expect(connection).resolves.not.toThrow();
    await SequelizeConnection.disconnect();
  });

  it("should be able to disconnect from the database", async () => {
    await SequelizeConnection.connect();
    const disconnection = SequelizeConnection.disconnect();
    expect(disconnection).resolves.not.toThrow();
  });
});
