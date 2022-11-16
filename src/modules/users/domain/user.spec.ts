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
    const userData = {
      email: "invalid_email",
      password: "valid_password",
    };
    const result = User.create(userData);

    expect(result.ok).toBe(false);
  });
  // if("should return User instance if data is valid", () => {
  //   const userData = {
  //     email: "valid_email@email.com",
  //     password: "valid_password",
  //   };
  //   User.create(userData);
  // })
});
