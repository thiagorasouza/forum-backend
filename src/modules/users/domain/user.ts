import { Result } from "../other/result";
import { UserEmail } from "./userEmail";

interface UserProps {
  email: UserEmail;
  password: string;
}

interface UserData {
  email: string;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(userData: UserData): any {
    const userEmail = UserEmail.create(userData.email);
  }
}
