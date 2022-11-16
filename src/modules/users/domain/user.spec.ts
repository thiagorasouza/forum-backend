import { Result } from "../other/result";
import { User } from "./user";
import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";

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
    const invalidEmail = Result.invalidParam<UserEmail>("email");
    jest.spyOn(UserEmail, "create").mockReturnValueOnce(invalidEmail);

    const userData = {
      email: "invalid_email",
      password: "valid_password",
    };
    const result = User.create(userData);

    expect(result).toEqual(invalidEmail);
  });

  it("should fail if password is not valid", () => {
    const invalidPassword = Result.invalidParam<UserPassword>("password");
    jest.spyOn(UserPassword, "create").mockReturnValueOnce(invalidPassword);

    const userData = {
      email: "valid_email@email.com",
      password: "invalid_password",
    };
    const result = User.create(userData);

    expect(result).toEqual(invalidPassword);
  });
});
