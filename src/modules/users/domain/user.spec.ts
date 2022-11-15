import { User } from "./user";

describe("User Test Suite", () => {
  it("should fail to create a user with an empty email", () => {
    const userData = {
      email: "",
      password: "valid_password",
    };
    const result = User.create(userData);
    const expected = {
      success: false,
      error: "Empty email",
    };

    expect(result).toEqual(expected);
  });
});
