import { Sequelize } from "sequelize-typescript";
import { SequelizeUserRepository } from "./SequelizeUserRepository";
import { SequelizeUserModel } from "./SequelizeUserModel";
import { makeUserModel } from "../domain/tests/userModel.mock";
import { Success } from "../core/success";
import { UserModel } from "../domain/userModel";

const makeSut = (): SequelizeUserRepository => {
  return new SequelizeUserRepository();
};

const mockUserModel = makeUserModel();
const mockUserData = SequelizeUserRepository.mapFromDomain(mockUserModel);

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

  beforeEach(async () => {
    SequelizeUserModel.destroy({ truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should be able to create a new user on database", async () => {
    const sut = makeSut();
    const createResult = await sut.create(mockUserModel);
    expect(createResult.ok).toBe(true);
    const usersCount = await SequelizeUserModel.count();
    expect(usersCount).toBe(1);
  });

  it("should be able to get a user by email", async () => {
    const sut = makeSut();
    await SequelizeUserModel.create(mockUserData);
    const getByEmailResult = (await sut.getByEmail(
      mockUserData.email
    )) as Success<UserModel>;
    expect(getByEmailResult.ok).toBe(true);
    expect(getByEmailResult?.value).toEqual(mockUserModel);
  });
});
