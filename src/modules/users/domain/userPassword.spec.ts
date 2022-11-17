import { Result } from "../core/result";
import { UserPassword } from "./userPassword";

describe("UserPassword Test Suite", () => {
  it("should fail when password is less than 6 characters", () => {
    const result = UserPassword.create("12345");
    expect(result).toEqual(Result.invalidParam<UserPassword>("password"));
  });

  it("should fail when password is bigger than 32 characters", () => {
    const result = UserPassword.create("012345678901234567890123456789123");
    expect(result).toEqual(Result.invalidParam<UserPassword>("password"));
  });

  it("should fail when password contain not allowed characters", () => {
    const result = UserPassword.create("abcdefº");
    expect(result).toEqual(Result.invalidParam<UserPassword>("password"));
  });

  it("should return UserPassword instance when password is valid", () => {
    const result = UserPassword.create("abc123!@#");
    const userPassword = result.value;
    expect(result.ok).toBe(true);
    expect(userPassword?.value).toBe("abc123!@#");
  });
});
