import * as uuid from "uuid";
import { UUIDIdentifier } from "../uuidIdentifier";

jest.mock("uuid");

describe("UUIDIdentifier Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateRandomId()", () => {
    it("should call uuid.v4", () => {
      const sut = new UUIDIdentifier();

      const uuidSpy = jest.spyOn(uuid, "v4");

      sut.generateRandomId();

      expect(uuidSpy).toHaveBeenCalledTimes(1);
    });

    it("should return a random uuid", () => {
      const sut = new UUIDIdentifier();

      jest.spyOn(uuid, "v4").mockReturnValueOnce("random_uuid");

      const result = sut.generateRandomId();

      expect(result).toBe("random_uuid");
    });
  });

  describe("isIdValid()", () => {
    it("should call uuid.validate with correct value", () => {
      const sut = new UUIDIdentifier();

      const validateSpy = jest.spyOn(uuid, "validate");

      sut.isIdValid("any_id");

      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(validateSpy).toHaveBeenCalledWith("any_id");
    });

    it("should return false for invalid uuids", () => {
      const sut = new UUIDIdentifier();

      jest.spyOn(uuid, "validate").mockReturnValueOnce(false);

      const result = sut.isIdValid("invalid_id");

      expect(result).toBe(false);
    });

    it("should return true for valid uuids", () => {
      const sut = new UUIDIdentifier();

      jest.spyOn(uuid, "validate").mockReturnValueOnce(true);

      const result = sut.isIdValid("valid_id");

      expect(result).toBe(true);
    });
  });
});
