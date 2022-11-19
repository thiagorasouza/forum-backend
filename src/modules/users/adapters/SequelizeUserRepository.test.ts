import { Sequelize } from "sequelize-typescript";
import { SequelizeUserRepository } from "./SequelizeUserRepository";
import { SequelizeUserModel } from "./SequelizeUserModel";
import { makeUserModel } from "../domain/tests/userModel.mock";

const makeSut = (): SequelizeUserRepository => {
  return new SequelizeUserRepository();
};

const mockUserModel = makeUserModel();

describe("SequelizeUserRepository Test Suite", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      database: "tests",
      dialect: "sqlite",
      username: "root",
      password: "",
      storage: ":memory:",
      models: [SequelizeUserModel], // or [Player, Team],
    });
    await sequelize.authenticate();
    await SequelizeUserModel.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new user on database", async () => {
    const sut = makeSut();
    await sut.create(mockUserModel);
    const usersCount = await SequelizeUserModel.count();
    expect(usersCount).toBe(1);
  });
});
