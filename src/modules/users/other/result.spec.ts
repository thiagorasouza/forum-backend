import { Result } from "./result";

describe("Result Test Suite", () => {
  it("should not be successful when the result is a failure", () => {
    const result = Result.fail("error message");
    expect(result.ok).toBe(false);
  });

  it("should be successful when the result is a success", () => {
    const result = Result.succeed("error message");
    expect(result.ok).toBe(true);
  });
});
