import { Success } from "../core/success";
import { UserEmail } from "./userEmail";
import { InvalidParamFailure } from "./userFailures";
import { UserModel } from "./userModel";
import { UserPassword } from "./userPassword";

export interface UserData {
  email: string;
  password: string;
}

export class User {
  private constructor(public readonly props: UserModel) {}

  static create(userData: UserData): InvalidParamFailure | Success<User> {
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
