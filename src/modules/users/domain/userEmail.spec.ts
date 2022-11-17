import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { UserEmail } from "./userEmail";

describe("UserEmail Test Suite", () => {
  it("should fail if email is not valid", () => {
    const result = UserEmail.create("invalid_email");

    expect(result).toEqual(new Failure<string>("Invalid email"));
  });

  it("should return UserEmail object if email is valid", () => {
    const result = UserEmail.create(
      "valid_email@email.com"
    ) as Success<UserEmail>;
    const userEmail = result.value;
    expect(result.ok).toBe(true);
    expect(userEmail.value).toBe("valid_email@email.com");
  });
});
