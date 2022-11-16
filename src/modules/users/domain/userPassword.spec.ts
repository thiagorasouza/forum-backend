import { UserPassword } from "./userPassword";

describe("UserPassword Test Suite", () => {
  it("should fail when password is less than 6 characters", () => {
    const result = UserPassword.create("12345");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Password is not valid");
  });

  it("should fail when password is bigger than 32 characters", () => {
    const result = UserPassword.create("012345678901234567890123456789123");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Password is not valid");
  });
});
