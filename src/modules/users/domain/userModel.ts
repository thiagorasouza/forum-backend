import { UserEmail } from "./userEmail";
import { UserId } from "./userId";
import { UserPassword } from "./userPassword";
import { UserUsername } from "./userUsername";

export interface UserModel {
  id: UserId;
  username: UserUsername;
  email: UserEmail;
  password: UserPassword;
}
