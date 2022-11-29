import { Success } from "../../../core/success";
import { UserEmail } from "../../userEmail";
import { UserId } from "../../userId";
import { UserModel } from "../../userModel";
import { UserPassword } from "../../userPassword";
import { UserUsername } from "../../userUsername";
import { mockIdentifier } from "./identifier.mock";

const mockUserId = (): UserId => {
  const userIdResult = UserId.create(
    mockIdentifier(),
    "any_id"
  ) as Success<UserId>;
  return userIdResult.value;
};

const mockUserUsername = (): UserUsername => {
  const userUsernameResult = UserUsername.create(
    "anyusername"
  ) as Success<UserUsername>;
  return userUsernameResult.value;
};

const mockUserEmail = (): UserEmail => {
  const userEmailResult = UserEmail.create(
    "any_email@email.com"
  ) as Success<UserEmail>;
  return userEmailResult.value;
};

const mockUserPassword = (): UserPassword => {
  const userPasswordResult = UserPassword.create(
    "any_password"
  ) as Success<UserPassword>;
  return userPasswordResult.value;
};

export const mockUserModel = (): UserModel => {
  return {
    id: mockUserId(),
    username: mockUserUsername(),
    email: mockUserEmail(),
    password: mockUserPassword(),
  };
};
