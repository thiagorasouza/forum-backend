import { Success } from "../../core/success";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { Identifier } from "../identifier";
import { UserId } from "../userId";

const invalidId = new InvalidParamFailure("id");

const mockIdentifier = (): Identifier => {
  class IdentifierStub implements Identifier {
    generateRandomId(): string {
      return "random_id";
    }

    isIdValid(id: string): boolean {
      return true;
    }
  }

  return new IdentifierStub();
};

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

  it("should call Identifier.isIdValid with correct value", () => {
    const identifierStub = mockIdentifier();
    const isIdValidSpy = jest.spyOn(identifierStub, "isIdValid");

    UserId.create("any_id", identifierStub);

    expect(isIdValidSpy).toHaveBeenCalledTimes(1);
    expect(isIdValidSpy).toHaveBeenCalledWith("any_id");
  });

  it("should fail when id is not valid", () => {
    const identifierStub = mockIdentifier();

    jest.spyOn(identifierStub, "isIdValid").mockReturnValueOnce(false);

    const result = UserId.create("invalid_id", identifierStub);

    expect(result).toEqual(invalidId);
  });

  // it("should return a UserId instance when valid id is provided", () => {
  //   const identifierStub = mockIdentifier();
  //   const result = UserId.create(
  //     "invalid_id",
  //     identifierStub
  //   ) as Success<UserId>;

  //   expect(result.ok).toBe(true);
  //   expect(result.value).toBe("random_id");
  // });
});
