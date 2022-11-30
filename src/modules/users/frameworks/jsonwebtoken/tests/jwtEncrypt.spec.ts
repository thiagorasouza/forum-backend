import * as jwt from "jsonwebtoken";
import { config } from "../../../../../main/config";
import { EncrypterPayload } from "../../../useCases/shared/protocols/encrypter";
import { JWTEncrypter } from "../jwtEncrypter";

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  ...jest.requireActual("jsonwebtoken"),
  sign(): string {
    return "any_token";
  },
}));

const JWT_SECRET = config.getJwtSecret();

const makeSut = (): JWTEncrypter => {
  return new JWTEncrypter(JWT_SECRET);
};

const mockEncrypterPayload = (): EncrypterPayload => ({
  sub: "any_id",
  username: "anyusername",
  email: "any_email@email.com",
});

describe("JWTEncrypter Test Suite", () => {
  it("should call jwt.sign() with correct value", () => {
    const sut = makeSut();

    const signSpy = jest.spyOn(jwt, "sign");

    const payload = mockEncrypterPayload();
    sut.encrypt(payload);

    expect(signSpy).toHaveBeenCalledWith(payload, JWT_SECRET);
  });

  // it("should return the signed token", () => {
  //   const sut = makeSut();

  //   const payload = mockEncrypterPayload();
  //   const result = sut.encrypt(payload);

  //   expect(result).toBe("any_token");
  // });
});
