import { User } from "./user";
import { UserEmail } from "./userEmail";

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
    const userEmailCreate = jest.spyOn(UserEmail, "create");

    const userData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };
    User.create(userData);

    expect(userEmailCreate).toHaveBeenCalledTimes(1);
    expect(userEmailCreate).toHaveBeenCalledWith("valid_email@email.com");
  });
});
