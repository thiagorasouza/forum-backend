import { Success } from "../core/success";
import { UserData } from "./userData";
import { UserEmail } from "./userEmail";
import { InvalidParamFailure } from "./userFailures";
import { UserModel } from "./userModel";
import { UserPassword } from "./userPassword";
import { UserUsername } from "./userUsername";

export class User {
  private constructor(public readonly props: UserModel) {}

  static create(userData: UserData): InvalidParamFailure | Success<User> {
    const userUsernameResult = UserUsername.create(userData.username);
    if (!userUsernameResult.ok) {
      return userUsernameResult;
    }

    const userEmailResult = UserEmail.create(userData.email);
    if (!userEmailResult.ok) {
      return userEmailResult;
    }

    const userPasswordResult = UserPassword.create(userData.password);
    if (!userPasswordResult.ok) {
      return userPasswordResult;
    }

    const validUserProps = {
      username: userUsernameResult.value,
      email: userEmailResult.value,
      password: userPasswordResult.value,
    };

    return new Success<User>(new User(validUserProps));
  }
}
