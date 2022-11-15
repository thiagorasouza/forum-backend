interface UserData {
  email: string;
  password: string;
}

export class User {
  static create(userData: UserData) {
    if (!userData.email) {
      return {
        success: false,
        error: "Empty email",
      };
    }

    if (!userData.password) {
      return {
        success: false,
        error: "Empty password",
      };
    }
  }
}
