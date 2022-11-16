import { Result } from "../other/result";

interface UserProps {
  email: string;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): any {
    if (!props.email) {
      return Result.fail("Empty email");
    }

    if (!props.password) {
      return Result.fail("Empty password");
    }
  }
}
