import * as bcrypt from "bcrypt";
import { BcryptHasher } from "../bcryptHasher";

jest.mock("bcrypt", () => ({
  __esModule: true,
  ...jest.requireActual("bcrypt"),
  async hash() {
    return "hashed_password";
  },
}));

const SALT_ROUNDS = 12;

const makeSut = (): BcryptHasher => {
  return new BcryptHasher(SALT_ROUNDS);
};

describe("BcryptHasher Test Suite", () => {
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
