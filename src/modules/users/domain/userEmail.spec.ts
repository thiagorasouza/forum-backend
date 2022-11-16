import { Validator } from "../adapters/validator";
import { UserEmail } from "./userEmail";

const makeValidator = (): Validator => {
  class ValidatorMock implements Validator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isEmailValid(email: string): boolean {
      return true;
    }
  }

  return new ValidatorMock();
};

interface SutTypes {
  sut: UserEmail;
  validator: Validator;
}

const makeSut = (): SutTypes => {
  const validator = makeValidator();
  const sut = new UserEmail(validator);

  return { sut, validator };
};

describe("UserEmail Test Suite", () => {
  it("should fail if email is not valid", () => {
    const { sut, validator } = makeSut();

    jest.spyOn(validator, "isEmailValid").mockReturnValueOnce(false);
    const result = sut.create("invalid_email");

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid email");
  });

  it("should return UserEmail object if email is valid", () => {
    const { sut } = makeSut();

    const result = sut.create("valid_email@email.com");
    const userEmail = result.value;

    expect(result.ok).toBe(true);
    expect(userEmail?.value).toEqual("valid_email@email.com");
  });
});
