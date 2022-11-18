import { Sanitizer } from "../../shared/sanitizer";
import { CreateUserHttpController } from "./createUserHttpController";

const makeSanitizer = (): Sanitizer => {
  class SanitizerMock implements Sanitizer {
    sanitize(value: string): string {
      return "sanitized_value";
    }
  }

  return new SanitizerMock();
};

interface SutTypes {
  sut: CreateUserHttpController;
  sanitizer: Sanitizer;
}

const makeSut = (): SutTypes => {
  const sanitizer = makeSanitizer();
  const sut = new CreateUserHttpController(sanitizer);

  return { sut, sanitizer };
};

describe("CreateUserHttpController Test Suite", () => {
  it("should sanitize user input", () => {
    const { sut, sanitizer } = makeSut();

    const sanitizerSpy = jest.spyOn(sanitizer, "sanitize");

    const request = {
      body: {
        email: "unsanitized_value",
        password: "unsanitized_value",
      },
    };
    sut.handle(request);

    expect(sanitizerSpy).toHaveBeenCalledTimes(2);
    expect(sanitizerSpy.mock.calls[0][0]).toBe(request.body.email);
    expect(sanitizerSpy.mock.calls[1][0]).toBe(request.body.password);
  });
});
