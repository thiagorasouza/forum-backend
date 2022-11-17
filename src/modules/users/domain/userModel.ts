import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";

export interface UserModel {
  email: UserEmail;
  password: UserPassword;
}
