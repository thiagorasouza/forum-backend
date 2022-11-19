import { Success } from "../../core/success";
import { User } from "../user";
import { UserEmail } from "../userEmail";
import { InvalidParamFailure } from "../userFailures";
import { UserPassword } from "../userPassword";

describe("User Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should check if email is valid on creation", () => {
    const userEmailCreate = jest.spyOn(UserEmail, "create");

    const userData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };
    User.create(userData);

    expect(userEmailCreate).toHaveBeenCalledTimes(1);
    expect(userEmailCreate).toHaveBeenCalledWith("valid_email@email.com");
  });

  it("should check if password is valid on creation", () => {
    const userPasswordCreate = jest.spyOn(UserPassword, "create");

    const userData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };
    User.create(userData);

    expect(userPasswordCreate).toHaveBeenCalledTimes(1);
    expect(userPasswordCreate).toHaveBeenCalledWith("valid_password");
  });

  it("should fail if email is not valid", () => {
    const invalidEmail = new InvalidParamFailure("email");
    jest.spyOn(UserEmail, "create").mockReturnValueOnce(invalidEmail);

    const userData = {
      email: "invalid_email",
      password: "valid_password",
    };
    const result = User.create(userData);

    expect(result).toEqual(invalidEmail);
  });

  it("should fail if password is not valid", () => {
    const invalidPassword = new InvalidParamFailure("password");
    jest.spyOn(UserPassword, "create").mockReturnValueOnce(invalidPassword);

    const userData = {
      email: "valid_email@email.com",
      password: "invalid_password",
    };
    const result = User.create(userData);

    expect(result).toEqual(invalidPassword);
  });

  it("should return User instance if data is valid", () => {
    const validEmail = new Success<UserEmail>({
      value: "valid_email@email.com",
    } as UserEmail);
    const validPassword = new Success<UserPassword>({
      value: "valid_password",
    } as UserPassword);

    jest.spyOn(UserEmail, "create").mockReturnValueOnce(validEmail);
    jest.spyOn(UserPassword, "create").mockReturnValueOnce(validPassword);

    const userData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };
    const result = User.create(userData) as Success<User>;

    expect(result.ok).toBe(true);
    expect(result.value).toBeInstanceOf(User);
  });
});