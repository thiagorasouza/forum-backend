import { Failure } from "./failure";

describe("Failure Test Suite", () => {
  it("should have an ok property set to false", () => {
    const result = new Failure<string>("any");
    expect(result.ok).toBe(false);
  });

  it("should hold a value", () => {
    const result = new Failure<string>("any");
    expect(result.error).toBe("any");
  });

  it("should be closed for modifications after object creation", () => {
    const result = new Failure("any");
    for (const property of Reflect.ownKeys(result)) {
      expect(Reflect.getOwnPropertyDescriptor(result, property)?.writable).toBe(
        false
      );
    }
  });
});
