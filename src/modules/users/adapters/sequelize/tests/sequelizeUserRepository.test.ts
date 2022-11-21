import { SequelizeUserRepository } from "../sequelizeUserRepository";
import { SequelizeUserModel } from "../sequelizeUserModel";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { Success } from "../../../core/success";
import { UserModel } from "../../../domain/userModel";
import { SequelizeConnection } from "../sequelizeConnection";
import { InconsistentDataFailure } from "../sequelizeUserFailures";

const makeSut = (): SequelizeUserRepository => {
  return new SequelizeUserRepository();
};

const mockUserData = SequelizeUserRepository.mapFromDomain(mockUserModel());

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

  it("should be able to get a user by email", async () => {
    const sut = makeSut();
    await SequelizeUserModel.create(mockUserData);
    const getByEmailResult = (await sut.getByEmail(
      mockUserData.email
    )) as Success<UserModel>;
    expect(getByEmailResult.ok).toBe(true);
    expect(getByEmailResult?.value).toEqual(mockUserModel());
  });

  it("should fail when inconsistent database data is detected", async () => {
    const sut = makeSut();
    const inconsistentUserData = {
      email: "invalid_email",
      password: "valid_password",
    };

    await SequelizeUserModel.create(inconsistentUserData);
    const getByEmailResult = (await sut.getByEmail(
      inconsistentUserData.email
    )) as InconsistentDataFailure;

    expect(getByEmailResult).toEqual(new InconsistentDataFailure());
  });
});
