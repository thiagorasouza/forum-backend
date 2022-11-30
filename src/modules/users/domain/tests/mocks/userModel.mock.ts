import { Success } from "../../../core/success";
import { UserEmail } from "../../userEmail";
import { UserId } from "../../userId";
import { UserModel } from "../../userModel";
import { UserPassword } from "../../userPassword";
import { UserUsername } from "../../userUsername";

const mockUserId = (): UserId => {
  const userIdResult = UserId.from("any_id");
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
  const userPasswordResult = UserPassword.from("hashed_password");
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
