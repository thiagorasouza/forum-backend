import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { UserId } from "../userId";

const invalidId = new InvalidParamFailure("id");

describe("UserId Test Suite", () => {
  it("should fail when id is not valid", () => {
    const result = UserId.create("invalid_id");
    expect(result).toEqual(invalidId);
  });

  // it("should fail when username is bigger than 20 characters", () => {
  //   const result = UserUsername.create("abcdefghijklmnopqrstuv");
  //   expect(result).toEqual(invalidUsername);
  // });

  // it("should fail if username contain spaces", () => {
  //   const result = UserUsername.create("abc def");
  //   expect(result).toEqual(invalidUsername);
  // });

  // it("should fail if username contain only numbers", () => {
  //   const result = UserUsername.create("0123456");
  //   expect(result).toEqual(invalidUsername);
  // });

  // it("should fail if username contain special characters", () => {
  //   const result = UserUsername.create("abcdef!");
  //   expect(result).toEqual(invalidUsername);
  // });

  // it("should return UserUsername instance when username is valid", () => {
  //   const result = UserUsername.create("abcdef") as Success<UserUsername>;
  //   const userUsername = result.value;
  //   expect(result.ok).toBe(true);
  //   expect(userUsername.value).toBe("abcdef");
  // });
});
