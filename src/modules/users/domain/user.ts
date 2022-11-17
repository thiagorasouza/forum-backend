import { Success } from "../core/success";
import { UserEmail } from "./userEmail";
import { InvalidParamFailure } from "./userErrors";
import { UserPassword } from "./userPassword";

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

interface NotYetValidatedUserData {
  email: string;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(
    userData: NotYetValidatedUserData
  ): InvalidParamFailure | Success<User> {
    const userEmailResult = UserEmail.create(userData.email);
    if (!userEmailResult.ok) {
      return userEmailResult;
    }

    const userPasswordResult = UserPassword.create(userData.password);
    if (!userPasswordResult.ok) {
      return userPasswordResult;
    }

    const validUserProps = {
      email: userEmailResult.value,
      password: userPasswordResult.value,
    };

    return new Success<User>(new User(validUserProps));
  }
}
