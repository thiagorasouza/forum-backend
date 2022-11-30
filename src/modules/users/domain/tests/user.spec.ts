import { Success } from "../../core/success";
import { User } from "../user";
import { UserEmail } from "../userEmail";
import { InvalidParamFailure } from "../../useCases/shared/failures/invalidParamFailure";
import { UserPassword } from "../userPassword";
import { UserUsername } from "../userUsername";
import {
  mockExistingUserData,
  mockUserData,
  mockUserDataWithId,
} from "./mocks/userData.mock";
import { mockIdentifier } from "./mocks/identifier.mock";
import { Identifier } from "../identifier";
import { UserId } from "../userId";
import { Hasher } from "../hasher";
import { mockHasher } from "./mocks/hasher.mock";

describe("User Test Suite", () => {
  let identifierStub: Identifier;
  let hasherStub: Hasher;
  beforeAll(() => {
    identifierStub = mockIdentifier();
    hasherStub = mockHasher();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(".create()", () => {
    it("should call UserId.create with correct value", async () => {
      const userIdCreate = jest.spyOn(UserId, "create");

      const userData = mockUserDataWithId();
      await User.create(userData, identifierStub, hasherStub);

      expect(userIdCreate).toHaveBeenCalledTimes(1);
      expect(userIdCreate).toHaveBeenCalledWith(identifierStub);
    });

    it("should check if username is valid on creation", async () => {
      const userUsernameCreate = jest.spyOn(UserUsername, "create");

      const userData = mockUserData();
      await User.create(userData, identifierStub, hasherStub);

      expect(userUsernameCreate).toHaveBeenCalledTimes(1);
      expect(userUsernameCreate).toHaveBeenCalledWith("anyusername");
    });

    it("should check if email is valid on creation", async () => {
      const userEmailCreate = jest.spyOn(UserEmail, "create");

      const userData = mockUserData();
      await User.create(userData, identifierStub, hasherStub);

      expect(userEmailCreate).toHaveBeenCalledTimes(1);
      expect(userEmailCreate).toHaveBeenCalledWith("any_email@email.com");
    });

    it("should check if password is valid on creation", async () => {
      const userPasswordCreate = jest.spyOn(UserPassword, "create");

      const userData = mockUserData();
      await User.create(userData, identifierStub, hasherStub);

      expect(userPasswordCreate).toHaveBeenCalledTimes(1);
      expect(userPasswordCreate).toHaveBeenCalledWith(
        "any_password",
        hasherStub
      );
    });

    it("should fail if username is not valid", async () => {
      const invalidUsername = new InvalidParamFailure("username");
      jest.spyOn(UserUsername, "create").mockReturnValueOnce(invalidUsername);

      const userData = mockUserData();
      const result = await User.create(userData, identifierStub, hasherStub);

      expect(result).toEqual(invalidUsername);
    });

    it("should fail if email is not valid", async () => {
      const invalidEmail = new InvalidParamFailure("email");
      jest.spyOn(UserEmail, "create").mockReturnValueOnce(invalidEmail);

      const userData = mockUserData();
      const result = await User.create(userData, identifierStub, hasherStub);

      expect(result).toEqual(invalidEmail);
    });

    it("should fail if password is not valid", async () => {
      const invalidPassword = new InvalidParamFailure("password");
      jest
        .spyOn(UserPassword, "create")
        .mockReturnValueOnce(Promise.resolve(invalidPassword));

      const userData = mockUserData();
      const result = await User.create(userData, identifierStub, hasherStub);

      expect(result).toEqual(invalidPassword);
    });

    it("should return a User instance if data is valid", async () => {
      const validEmail = new Success<UserEmail>({
        value: "valid_email@email.com",
      } as UserEmail);
      const validPassword = new Success<UserPassword>({
        value: "valid_password",
      } as UserPassword);

      jest.spyOn(UserEmail, "create").mockReturnValueOnce(validEmail);
      jest
        .spyOn(UserPassword, "create")
        .mockReturnValueOnce(Promise.resolve(validPassword));

      const userData = mockUserData();
      const result = (await User.create(
        userData,
        identifierStub,
        hasherStub
      )) as Success<User>;

      expect(result.ok).toBe(true);
      expect(result.value).toBeInstanceOf(User);
    });
  });

  describe(".from()", () => {
    it("should call UserId.from with correct value", async () => {
      const userIdFrom = jest.spyOn(UserId, "from");

      const userData = mockExistingUserData();
      User.from(userData);

      expect(userIdFrom).toHaveBeenCalledTimes(1);
      expect(userIdFrom).toHaveBeenCalledWith(userData.id);
    });

    it("should call UserUsername.from with correct value", async () => {
      const userUsernameFrom = jest.spyOn(UserUsername, "from");

      const userData = mockExistingUserData();
      User.from(userData);

      expect(userUsernameFrom).toHaveBeenCalledTimes(1);
      expect(userUsernameFrom).toHaveBeenCalledWith(userData.username);
    });

    it("should call UserEmail.from with correct value", async () => {
      const userEmailFrom = jest.spyOn(UserEmail, "from");

      const userData = mockExistingUserData();
      User.from(userData);

      expect(userEmailFrom).toHaveBeenCalledTimes(1);
      expect(userEmailFrom).toHaveBeenCalledWith(userData.email);
    });

    it("should call UserPassword.from with correct value", async () => {
      const userPasswordFrom = jest.spyOn(UserPassword, "from");

      const userData = mockExistingUserData();
      User.from(userData);

      expect(userPasswordFrom).toHaveBeenCalledTimes(1);
      expect(userPasswordFrom).toHaveBeenCalledWith(userData.password);
    });
  });
});
