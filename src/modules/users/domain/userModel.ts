import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";

export interface UserModel {
  name: string;
  email: UserEmail;
  password: UserPassword;
}
