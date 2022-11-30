import { Success } from "../../core/success";
import { User } from "../user";
import { UserEmail } from "../userEmail";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { UserPassword } from "../userPassword";
import { UserUsername } from "../userUsername";
import { mockUserData, mockUserDataWithId } from "./mocks/userData.mock";
import { mockIdentifier } from "./mocks/identifier.mock";
import { Identifier } from "../identifier";
import { UserId } from "../userId";

describe("User Test Suite", () => {
  let identifierStub: Identifier;
  beforeAll(() => {
    identifierStub = mockIdentifier();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call UserId.create with id if id is passed", () => {
    const userIdCreate = jest.spyOn(UserId, "create");

    const userData = mockUserDataWithId();
    User.create(userData, identifierStub);

    expect(userIdCreate).toHaveBeenCalledTimes(1);
    expect(userIdCreate).toHaveBeenCalledWith(identifierStub, "any_id");
  });

  it("should call UserId.create without id if no id is passed", () => {
    const userIdCreate = jest.spyOn(UserId, "create");

    const userData = mockUserData();
    User.create(userData, identifierStub);

    expect(userIdCreate).toHaveBeenCalledTimes(1);
    expect(userIdCreate).toHaveBeenCalledWith(identifierStub, undefined);
  });

  it("should check if username is valid on creation", () => {
    const userUsernameCreate = jest.spyOn(UserUsername, "create");

    const userData = mockUserData();
    User.create(userData, identifierStub);

    expect(userUsernameCreate).toHaveBeenCalledTimes(1);
    expect(userUsernameCreate).toHaveBeenCalledWith("anyusername");
  });

  it("should check if email is valid on creation", () => {
    const userEmailCreate = jest.spyOn(UserEmail, "create");

    const userData = mockUserData();
    User.create(userData, identifierStub);

    expect(userEmailCreate).toHaveBeenCalledTimes(1);
    expect(userEmailCreate).toHaveBeenCalledWith("any_email@email.com");
  });

  it("should check if password is valid on creation", () => {
    const userPasswordCreate = jest.spyOn(UserPassword, "create");

    const userData = mockUserData();
    User.create(userData, identifierStub);

    expect(userPasswordCreate).toHaveBeenCalledTimes(1);
    expect(userPasswordCreate).toHaveBeenCalledWith("any_password");
  });

  it("should fail if username is not valid", () => {
    const invalidUsername = new InvalidParamFailure("username");
    jest.spyOn(UserUsername, "create").mockReturnValueOnce(invalidUsername);

    const userData = mockUserData();
    const result = User.create(userData, identifierStub);

    expect(result).toEqual(invalidUsername);
  });

  it("should fail if email is not valid", () => {
    const invalidEmail = new InvalidParamFailure("email");
    jest.spyOn(UserEmail, "create").mockReturnValueOnce(invalidEmail);

    const userData = mockUserData();
    const result = User.create(userData, identifierStub);

    expect(result).toEqual(invalidEmail);
  });

  it("should fail if password is not valid", () => {
    const invalidPassword = new InvalidParamFailure("password");
    jest.spyOn(UserPassword, "create").mockReturnValueOnce(invalidPassword);

    const userData = mockUserData();
    const result = User.create(userData, identifierStub);

    expect(result).toEqual(invalidPassword);
  });

  it("should return a User instance if data is valid", () => {
    const validEmail = new Success<UserEmail>({
      value: "valid_email@email.com",
    } as UserEmail);
    const validPassword = new Success<UserPassword>({
      value: "valid_password",
    } as UserPassword);

    jest.spyOn(UserEmail, "create").mockReturnValueOnce(validEmail);
    jest.spyOn(UserPassword, "create").mockReturnValueOnce(validPassword);

    const userData = mockUserData();
    const result = User.create(userData, identifierStub) as Success<User>;

    expect(result.ok).toBe(true);
    expect(result.value).toBeInstanceOf(User);
  });
});
