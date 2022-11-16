interface UserProps {
  email: string;
  password: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps) {
    if (!props.email) {
      return {
        success: false,
        error: "Empty email",
      };
    }

    if (!props.password) {
      return {
        success: false,
        error: "Empty password",
      };
    }
  }
}
