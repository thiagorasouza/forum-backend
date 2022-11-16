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
    const userEmail = UserEmail.create(userData.email);
    const userPassword = UserPassword.create(userData.password);
  }
}
