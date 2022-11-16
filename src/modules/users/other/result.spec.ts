import { Result } from "./result";

type Response = {
  value: string;
};

const mockResponse = (): Response => ({
  value: "valid response",
});

describe("Result Test Suite", () => {
  it("should not be OK on failures", () => {
    const result = Result.fail("error message");
    expect(result.ok).toBe(false);
  });

  it("should be OK on sucess", () => {
    const response = mockResponse();
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
