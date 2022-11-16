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

  it("should fail to create a user with an empty password", () => {
    const userData = {
      email: "valid_email@email.com",
      password: "",
    };
    const result = User.create(userData);
    const expected = {
      success: false,
      error: "Empty password",
    };

    expect(result).toEqual(expected);
  });

  // it("should fail to create a user with an invalid email", () => {
  //   const userData = {
  //     email: "invalid_email",
  //     password: "valid_password",
  //   };
  //   const result = User.create(userData);
  //   const expected = {
  //     success: false,
  //     error: "Invalid email",
  //   };

  //   expect(result).toEqual(expected);
  // });
});
