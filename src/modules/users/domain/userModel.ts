import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { UserUsername } from "./userUsername";

export interface UserModel {
  username: UserUsername;
  email: UserEmail;
  password: UserPassword;
}
