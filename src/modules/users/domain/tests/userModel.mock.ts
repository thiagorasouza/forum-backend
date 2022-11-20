import { Success } from "../../core/success";
import { UserEmail } from "../userEmail";
import { UserModel } from "../userModel";
import { UserPassword } from "../userPassword";

const makeUserEmail = (): UserEmail => {
  const userEmailResult = UserEmail.create(
    "any_email@email.com"
  ) as Success<UserEmail>;
  return userEmailResult.value;
};

const makeUserPassword = (): UserPassword => {
  const userPasswordResult = UserPassword.create(
    "any_password"
  ) as Success<UserPassword>;
  return userPasswordResult.value;
};

export const makeUserModel = (): UserModel => {
  return {
    email: makeUserEmail(),
    password: makeUserPassword(),
  };
};
