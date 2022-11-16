import { Result } from "./result";

describe("Result Test Suite", () => {
  it("should not be successful when the result is a failure", () => {
    const result = Result.fail("error message");
    expect(result.ok).toBe(false);
  });

  it("should be successful when the result is a success", () => {
    type Response = {
      value: string;
    };
    const response: Response = {
      value: "valid response",
    };
    const result = Result.succeed<Response>(response);
    expect(result.ok).toBe(true);
  });

  it("should hold an error on failure", () => {
    const result = Result.fail("error message");
    expect(result.error).toBe("error message");
  });

  it("should hold a value on success", () => {
    type Response = {
      value: string;
    };
    const response: Response = {
      value: "valid response",
    };
    const result = Result.succeed<Response>(response);
    expect(result.value).toEqual(response);
  });

  it("should be closed for modifications after object creation", () => {
    const result = Result.fail("error message");
    for (const property of Reflect.ownKeys(result)) {
      expect(Reflect.getOwnPropertyDescriptor(result, property)?.writable).toBe(
        false
      );
    }
  });
});
