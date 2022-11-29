import { Success } from "../../../core/success";

export class UserLoggedInSuccess extends Success<string> {
  constructor(token: string) {
    super(token);
  }
}
