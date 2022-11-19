import { UserEmail } from "../userEmail";
import { UserModel } from "../userModel";
import { UserPassword } from "../userPassword";

const makeUserEmail = (): UserEmail => {
  return {
    value: "any_email@email.com",
  } as UserEmail;
};

const makeUserPassword = (): UserPassword => {
  return {
    value: "any_password@email.com",
  } as UserPassword;
};

export const makeUserModel = (): UserModel => {
  return {
    email: makeUserEmail(),
    password: makeUserPassword(),
  };
};
