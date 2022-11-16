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
});
