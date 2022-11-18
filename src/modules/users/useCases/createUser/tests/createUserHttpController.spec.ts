import { Sanitizer } from "../../../../shared/sanitizer";
import { CreateUserUseCase } from "../createUserUseCase";
import { CreateUserHttpController } from "../createUserHttpController";
import { makeCreateUserUseCase } from "./createUserMock";

const makeSanitizer = (): Sanitizer => {
  class SanitizerMock implements Sanitizer {
    sanitize(): string {
      return "sanitized_value";
    }
  }

  return new SanitizerMock();
};

interface SutTypes {
  useCase: CreateUserUseCase;
  sut: CreateUserHttpController;
  sanitizer: Sanitizer;
}

const makeSut = (): SutTypes => {
  const { sut: useCase } = makeCreateUserUseCase();
  const sanitizer = makeSanitizer();
  const sut = new CreateUserHttpController(useCase, sanitizer);

  return { sut, sanitizer, useCase };
};

describe("CreateUserHttpController Test Suite", () => {
  it("should sanitize user input", () => {
    const { sut, sanitizer } = makeSut();

    const sanitizerSpy = jest.spyOn(sanitizer, "sanitize");

    const httpRequest = {
      body: {
        email: "unsanitized_value",
        password: "unsanitized_value",
      },
    };
    sut.handle(httpRequest);

    expect(sanitizerSpy).toHaveBeenCalledTimes(2);
    expect(sanitizerSpy.mock.calls[0][0]).toBe(httpRequest.body.email);
    expect(sanitizerSpy.mock.calls[1][0]).toBe(httpRequest.body.password);
  });

  it("should execute CreateUserUseCase with sanitized values", () => {
    const { sut, useCase } = makeSut();

    const useCaseSpy = jest.spyOn(useCase, "execute");

    const httpRequest = {
      body: {
        email: "unsanitized_value",
        password: "unsanitized_value",
      },
    };
    sut.handle(httpRequest);

    const createUserRequest = {
      email: "sanitized_value",
      password: "sanitized_value",
    };

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(createUserRequest);
  });
});
