import * as bcrypt from "bcrypt";
import { BcryptHasher } from "../bcryptHasher";

jest.mock("bcrypt", () => ({
  __esModule: true,
  ...jest.requireActual("bcrypt"),
  async hash(): Promise<string> {
    return "hashed_password";
  },
  async compare(): Promise<boolean> {
    return true;
  },
}));

const SALT_ROUNDS = 12;

const makeSut = (): BcryptHasher => {
  return new BcryptHasher(SALT_ROUNDS);
};

describe("BcryptHasher Test Suite", () => {
  describe(".hash()", () => {
    it("should call bcrypt.hash with correct values", async () => {
      const sut = makeSut();

      const hashSpy = jest.spyOn(bcrypt, "hash");

      const password = "any_password";
      await sut.hash(password);

      expect(hashSpy).toHaveBeenCalledWith(password, SALT_ROUNDS);
    });

    it("should return the hashed password", async () => {
      const sut = makeSut();

      const password = "any_password";
      const result = await sut.hash(password);

      expect(result).toBe("hashed_password");
    });
  });

  describe(".compare()", () => {
    it("should call bcrypt.compare with correct values", async () => {
      const sut = makeSut();

      const compareSpy = jest.spyOn(bcrypt, "compare");

      const rawPassword = "raw_password";
      const hashedPassword = "hashed_password";

      await sut.compare(rawPassword, hashedPassword);

      expect(compareSpy).toHaveBeenCalledWith(rawPassword, hashedPassword);
    });

    it("should return false if bcrypt.compare returns false", async () => {
      const sut = makeSut();

      jest.spyOn(bcrypt, "compare").mockImplementationOnce(async () => false);

      const rawPassword = "raw_password";
      const hashedPassword = "hashed_password";

      const result = await sut.compare(rawPassword, hashedPassword);

      expect(result).toBe(false);
    });

    it("should return true if bcrypt.compare returns true", async () => {
      const sut = makeSut();

      const rawPassword = "raw_password";
      const hashedPassword = "hashed_password";

      const result = await sut.compare(rawPassword, hashedPassword);

      expect(result).toBe(true);
    });
  });
});
