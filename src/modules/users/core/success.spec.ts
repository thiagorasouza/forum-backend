import { Success } from "./success";

describe("Success Test Suite", () => {
  it("should have an ok property set to true", () => {
    const result = new Success<string>("any");
    expect(result.ok).toBe(true);
  });

  it("should hold a value", () => {
    const result = new Success<string>("any");
    expect(result.value).toBe("any");
  });

  it("should be closed for modifications after object creation", () => {
    const result = new Success("any");
    for (const property of Reflect.ownKeys(result)) {
      expect(Reflect.getOwnPropertyDescriptor(result, property)?.writable).toBe(
        false
      );
    }
  });
});
