import { UserEmail } from "./userEmail";

describe("UserEmail Test Suite", () => {
  it("should fail if email is not valid", () => {
    const result = UserEmail.create("invalid_email");

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid email");
  });

  it("should return UserEmail object if email is valid", () => {
    const result = UserEmail.create("valid_email@email.com");
    const userEmail = result.value;

    expect(result.ok).toBe(true);
    expect(userEmail?.value).toEqual("valid_email@email.com");
  });
});
