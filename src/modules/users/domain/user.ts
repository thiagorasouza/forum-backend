import { Success } from "../core/success";
import { ExistingUserData, UserData } from "./userData";
import { UserEmail } from "./userEmail";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";
import { UserModel } from "./userModel";
import { UserPassword } from "./userPassword";
import { UserUsername } from "./userUsername";
import { Identifier } from "./identifier";
import { UserId } from "./userId";
import { Hasher } from "./hasher";

export class User {
  private constructor(public readonly props: UserModel) {}

  public static async create(
    userData: UserData,
    identifier: Identifier,
    hasher: Hasher
  ): Promise<InvalidParamFailure | Success<User>> {
    const userIdResult = UserId.create(identifier);

    const userUsernameResult = UserUsername.create(userData.username);
    if (!userUsernameResult.ok) {
      return userUsernameResult;
    }

    const userEmailResult = UserEmail.create(userData.email);
    if (!userEmailResult.ok) {
      return userEmailResult;
    }

    const userPasswordResult = await UserPassword.create(
      userData.password,
      hasher
    );
    if (!userPasswordResult.ok) {
      return userPasswordResult;
    }

    const validUserProps = {
      id: userIdResult.value,
      username: userUsernameResult.value,
      email: userEmailResult.value,
      password: userPasswordResult.value,
    };

    return new Success<User>(new User(validUserProps));
  }

  public static from(userData: ExistingUserData): Success<User> {
    const userIdResult = UserId.from(userData.id);
    const userUsernameResult = UserUsername.from(userData.username);
    const userEmailResult = UserEmail.from(userData.email);
    const userPasswordResult = UserPassword.from(userData.password);

    const userProps = {
      id: userIdResult.value,
      username: userUsernameResult.value,
      email: userEmailResult.value,
      password: userPasswordResult.value,
    };

    return new Success<User>(new User(userProps));
  }
}
