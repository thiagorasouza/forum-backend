import { Result } from "../other/result";
import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";

interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

interface UserData {
  email: string;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(userData: UserData): any {
    const userEmailResult = UserEmail.create(userData.email);
    if (!userEmailResult.ok) {
      return userEmailResult;
    }

    const userPasswordResult = UserPassword.create(userData.password);
    if (!userPasswordResult.ok) {
      return userPasswordResult;
    }

    const props = {
      email: userEmailResult.value,
      password: userPasswordResult.value,
    };

    return Result.succeed<User>(new User(props));
  }
}
