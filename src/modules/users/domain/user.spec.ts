import { User } from "./user";

describe("User Test Suite", () => {
  it("should fail to create a user with an empty email", () => {
    const userData = {
      email: "",
      password: "valid_password",
    };
    const result = User.create(userData);

    expect(result.ok).toBe(false);
  });

  it("should fail to create a user with an empty password", () => {
    const userData = {
      email: "valid_email@email.com",
      password: "",
    };
    const result = User.create(userData);

    expect(result.ok).toBe(false);
  });
});
