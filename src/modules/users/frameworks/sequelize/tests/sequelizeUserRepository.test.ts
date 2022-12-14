import { SequelizeUserRepository } from "../sequelizeUserRepository";
import { SequelizeUserModel } from "../models/sequelizeUserModel";
import { mockUserModel } from "../../../domain/tests/mocks/userModel.mock";
import { SequelizeConnection } from "../sequelizeConnection";
import { UserNotFoundFailure } from "../../../useCases/shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../../../useCases/shared/successes/userFoundSuccess";
import { mockExistingUserData } from "../../../domain/tests/mocks/userData.mock";
import { mockIdentifier } from "../../../domain/tests/mocks/identifier.mock";
import { config } from "../../../../../main/config";

const makeSut = (): SequelizeUserRepository => {
  return new SequelizeUserRepository(mockIdentifier());
};

describe("SequelizeUserRepository Test Suite", () => {
  beforeAll(async () => {
    await SequelizeConnection.connect(config.getSequelizeUri());
    await SequelizeUserModel.sync();
  });

  beforeEach(async () => {
    SequelizeUserModel.destroy({ truncate: true });
  });

  afterAll(async () => {
    await SequelizeConnection.disconnect();
  });

  it("should be able to create a new user on database", async () => {
    const sut = makeSut();
    const createResult = await sut.create(mockUserModel());
    expect(createResult.ok).toBe(true);
    const usersCount = await SequelizeUserModel.count();
    expect(usersCount).toBe(1);
  });

  it("should fail to get a user by email if user does not exist", async () => {
    const sut = makeSut();
    const getByEmailResult = (await sut.getByEmail(
      "any_email"
    )) as UserNotFoundFailure;
    expect(getByEmailResult).toEqual(new UserNotFoundFailure());
  });

  it("should be able to get a user by email if user exists", async () => {
    const sut = makeSut();
    const userData = mockExistingUserData();
    await SequelizeUserModel.create({ ...userData });
    const getByEmailResult = (await sut.getByEmail(
      userData.email
    )) as UserFoundSuccess;
    expect(getByEmailResult.ok).toBe(true);
    expect(getByEmailResult?.value).toEqual(mockUserModel());
  });

  it("should fail to get a user by username if user does not exist", async () => {
    const sut = makeSut();
    const getByEmailResult = (await sut.getByUsername(
      "any_username"
    )) as UserNotFoundFailure;
    expect(getByEmailResult).toEqual(new UserNotFoundFailure());
  });

  it("should be able to get a user by username if user exists", async () => {
    const sut = makeSut();
    const userData = mockExistingUserData();
    await SequelizeUserModel.create({ ...userData });
    const getByUsernameResult = (await sut.getByUsername(
      userData.username
    )) as UserFoundSuccess;
    expect(getByUsernameResult.ok).toBe(true);
    expect(getByUsernameResult?.value).toEqual(mockUserModel());
  });
});
