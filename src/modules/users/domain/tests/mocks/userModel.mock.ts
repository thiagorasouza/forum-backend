import { Success } from "../../../core/success";
import { UserEmail } from "../../userEmail";
import { UserModel } from "../../userModel";
import { UserPassword } from "../../userPassword";
import { UserUsername } from "../../userUsername";

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
    "hashed_password"
  ) as Success<UserPassword>;
  return userPasswordResult.value;
};

export const mockUserModel = (): UserModel => {
  return {
    username: mockUserUsername(),
    email: mockUserEmail(),
    password: mockUserPassword(),
  };
};
