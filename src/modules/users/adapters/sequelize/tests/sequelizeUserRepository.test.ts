import { SequelizeUserRepository } from "../sequelizeUserRepository";
import { SequelizeUserModel } from "../sequelizeUserModel";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { Success } from "../../../core/success";
import { UserModel } from "../../../domain/userModel";
import { SequelizeConnection } from "../sequelizeConnection";
import { InconsistentDataFailure } from "../sequelizeUserFailures";
import { UserData } from "../../../domain/userData";
import { UserNotFoundFailure } from "../../../useCases/failures/userNotFoundFailure";
import { User } from "../../../domain/user";
import { InvalidParamFailure } from "../../../domain/userFailures";

const makeSut = (): SequelizeUserRepository => {
  return new SequelizeUserRepository();
};

const mockUserData = (): UserData => {
  return SequelizeUserRepository.mapFromDomain(mockUserModel());
};

describe("SequelizeUserRepository Test Suite", () => {
  beforeAll(async () => {
    await SequelizeConnection.connect([SequelizeUserModel]);
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
    const userData = mockUserData();
    await SequelizeUserModel.create({ ...userData });
    const getByEmailResult = (await sut.getByEmail(
      userData.email
    )) as Success<UserModel>;
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
    const userData = mockUserData();
    await SequelizeUserModel.create({ ...userData });
    const getByUsernameResult = (await sut.getByUsername(
      userData.username
    )) as Success<UserModel>;
    expect(getByUsernameResult.ok).toBe(true);
    expect(getByUsernameResult?.value).toEqual(mockUserModel());
  });

  it("should fail when inconsistent database data is detected", async () => {
    const sut = makeSut();
    const userData = mockUserData();

    jest
      .spyOn(User, "create")
      .mockReturnValueOnce(new InvalidParamFailure("any_field"));

    await SequelizeUserModel.create({ ...userData });
    const getByEmailResult = (await sut.getByEmail(
      userData.email
    )) as InconsistentDataFailure;

    expect(getByEmailResult).toEqual(new InconsistentDataFailure());
  });
});
