import { UserPassword } from "./userPassword";

describe("UserPassword Test Suite", () => {
  it("should fail when password is less than 6 characters", () => {
    const result = UserPassword.create("12345");
    expect(result.ok).toBe(false);
  });
});
