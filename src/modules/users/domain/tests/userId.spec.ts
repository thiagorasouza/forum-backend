import { Success } from "../../core/success";
import { Identifier } from "../identifier";
import { UserId } from "../userId";
import { mockIdentifier } from "./mocks/identifier.mock";

describe("UserId Test Suite", () => {
  let identifierStub: Identifier;
  beforeAll(() => {
    identifierStub = mockIdentifier();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(".create()", () => {
    it("should call Identifier.generateRandomId", () => {
      const generateRandomIdSpy = jest.spyOn(
        identifierStub,
        "generateRandomId"
      );

      UserId.create(identifierStub);

      expect(generateRandomIdSpy).toHaveBeenCalledTimes(1);
    });

    it("should return a Success<UserId> instance with the new id", () => {
      const result = UserId.create(identifierStub);
      const userId = result.value;

      expect(result).toBeInstanceOf(Success<UserId>);
      expect(userId.value).toBe("random_id");
    });
  });

  describe(".from()", () => {
    it("should return a Success<UserId> instance with the provided id", () => {
      const result = UserId.from("any_id");
      const userId = result.value;

      expect(result).toBeInstanceOf(Success<UserId>);
      expect(userId.value).toBe("any_id");
    });
  });
});
