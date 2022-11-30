import { Success } from "../../core/success";
import { UserEmail } from "../userEmail";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";

const invalidPassword = new InvalidParamFailure("email");
describe("UserEmail Test Suite", () => {
  describe(".create()", () => {
    it("should fail if email is not valid", () => {
      const result = UserEmail.create("invalid_email");

      expect(result).toEqual(invalidPassword);
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

  describe(".from()", () => {
    it("should return a Success<UserEmail> instance with the provided id", () => {
      const result = UserEmail.from("any_username");
      const userEmail = result.value;

      expect(result).toBeInstanceOf(Success<UserEmail>);
      expect(userEmail.value).toBe("any_username");
    });
  });
});
