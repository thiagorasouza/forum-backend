import { Success } from "../../core/success";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { UserId } from "../userId";
import { mockIdentifier } from "./mocks/identifier.mock";

const invalidId = new InvalidParamFailure("id");

describe("UserId Test Suite", () => {
  it("should call Identifier.generateRandomId if id is not provided", () => {
    const identifierStub = mockIdentifier();
    const generateRandomIdSpy = jest.spyOn(identifierStub, "generateRandomId");

    UserId.create(null, identifierStub);

    expect(generateRandomIdSpy).toHaveBeenCalledTimes(1);
  });

  it("should return a UserId instance with a new id when id is not provided", () => {
    const identifierStub = mockIdentifier();
    const result = UserId.create(null, identifierStub) as Success<UserId>;
    const userId = result.value;

    expect(result.ok).toBe(true);
    expect(userId.value).toBe("random_id");
  });

  it("should call Identifier.isIdValid with correct value when id is provided", () => {
    const identifierStub = mockIdentifier();
    const isIdValidSpy = jest.spyOn(identifierStub, "isIdValid");

    UserId.create("any_id", identifierStub);

    expect(isIdValidSpy).toHaveBeenCalledTimes(1);
    expect(isIdValidSpy).toHaveBeenCalledWith("any_id");
  });

  it("should fail when provided id is not valid", () => {
    const identifierStub = mockIdentifier();

    jest.spyOn(identifierStub, "isIdValid").mockReturnValueOnce(false);

    const result = UserId.create("invalid_id", identifierStub);

    expect(result).toEqual(invalidId);
  });

  it("should return a UserId instance with the provided id when a valid id is provided", () => {
    const identifierStub = mockIdentifier();

    const result = UserId.create("valid_id", identifierStub) as Success<UserId>;
    const userId = result.value;

    expect(result.ok).toBe(true);
    expect(userId.value).toBe("valid_id");
  });
});
