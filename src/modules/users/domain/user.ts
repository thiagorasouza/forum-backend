import { Result } from "../other/result";
import { UserEmailInterface } from "./interfaces/userEmailInterface";

interface UserProps {
  email: UserEmailInterface;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): any {
    if (!props.email.value) {
      return Result.fail("Empty email");
    }
    if (!props.password) {
      return Result.fail("Empty password");
    }
  }
}
