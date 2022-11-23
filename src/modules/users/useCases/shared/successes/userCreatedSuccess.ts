import { Success } from "../../../core/success";

export class UserCreatedSuccess extends Success<string> {
  constructor() {
    super("User created");
  }
}
