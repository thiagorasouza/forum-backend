import { Success } from "../../core/success";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { Hasher } from "../hasher";
import { UserPassword } from "../userPassword";
import { mockHasher } from "./mocks/hasher.mock";

const invalidPassword = new InvalidParamFailure("password");

describe("UserPassword Test Suite", () => {
  let hasherStub: Hasher;
  beforeAll(() => {
    hasherStub = mockHasher();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(".create()", () => {
    it("should fail when password is less than 6 characters", async () => {
      const result = await UserPassword.create("12345", hasherStub);
      expect(result).toEqual(invalidPassword);
    });

    it("should fail when password is bigger than 32 characters", async () => {
      const result = await UserPassword.create(
        "012345678901234567890123456789123",
        hasherStub
      );
      expect(result).toEqual(invalidPassword);
    });

    it("should fail when password contain not allowed characters", async () => {
      const result = await UserPassword.create("abcdefº", hasherStub);
      expect(result).toEqual(invalidPassword);
    });

    it("should call Hasher.hash with correct value if password is valid", async () => {
      const hashSpy = jest.spyOn(hasherStub, "hash");

      const validPassword = "valid_password";
      await UserPassword.create(validPassword, hasherStub);

      expect(hashSpy).toHaveBeenCalledTimes(1);
      expect(hashSpy).toHaveBeenCalledWith(validPassword);
    });

    it("should return UserPassword with hashed password when password is valid", async () => {
      const result = (await UserPassword.create(
        "valid_password",
        hasherStub
      )) as Success<UserPassword>;
      const userPassword = result.value;
      expect(result.ok).toBe(true);
      expect(userPassword?.value).toBe("hashed_password");
    });
  });

  describe(".from()", () => {
    it("should return a Success<UserEmail> instance with the provided id", () => {
      const result = UserPassword.from("hashed_password");
      const userPassword = result.value;

      expect(result).toBeInstanceOf(Success<UserPassword>);
      expect(userPassword.value).toBe("hashed_password");
    });
  });
});
