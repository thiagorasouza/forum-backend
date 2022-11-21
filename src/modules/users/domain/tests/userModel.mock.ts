import { Success } from "../../core/success";
import { UserEmail } from "../userEmail";
import { UserModel } from "../userModel";
import { UserPassword } from "../userPassword";

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
    name: "any_name",
    email: mockUserEmail(),
    password: mockUserPassword(),
  };
};
