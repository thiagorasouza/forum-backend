import { MissingParamFailure } from "../../useCases/shared/failures/missingParamFailure";
import { Guard } from "../guard";
import { Success } from "../success";

describe("Guard Test Suite", () => {
  it("should return MissingParamFailure for missing fields", () => {
    const inputMock = {};
    const requiredFieldsMock = ["any_field"];
    const guardResult = Guard.againstNullOrUndefined(
      inputMock,
      requiredFieldsMock
    );
    expect(guardResult).toEqual(new MissingParamFailure(requiredFieldsMock[0]));
  });

  it("should return MissingParamFailure for the first missing fields if many", () => {
    const inputMock = { second: "any_value", forth: "any_value" };
    const requiredFieldsMock = ["first", "second", "third", "forth"];
    const guardResult = Guard.againstNullOrUndefined(
      inputMock,
      requiredFieldsMock
    );
    expect(guardResult).toEqual(new MissingParamFailure(requiredFieldsMock[0]));
  });

  it("should succeed if no fields are missing", () => {
    const inputMock = { first: "any_value", second: "any_value" };
    const requiredFieldsMock = ["first", "second"];
    const guardResult = Guard.againstNullOrUndefined(
      inputMock,
      requiredFieldsMock
    );
    expect(guardResult).toBeInstanceOf(Success);
  });
});
