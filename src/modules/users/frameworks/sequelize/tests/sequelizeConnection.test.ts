import { config } from "../../../../../main/config";
import { SequelizeConnection } from "../sequelizeConnection";

describe("SequelizeConnection Test Suite", () => {
  it("should be able to connect to the database", async () => {
    const connection = SequelizeConnection.connect(config.getSequelizeUri());
    await expect(connection).resolves.not.toThrow();
    await SequelizeConnection.disconnect();
  });

  it("should be able to disconnect from the database", async () => {
    await SequelizeConnection.connect(config.getSequelizeUri());
    const disconnection = SequelizeConnection.disconnect();
    expect(disconnection).resolves.not.toThrow();
  });
});
