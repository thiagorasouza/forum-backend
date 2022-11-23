import { Success } from "../../../core/success";
import { UserModel } from "../../../domain/userModel";

export class UserFoundSuccess extends Success<UserModel> {
  constructor(userModel: UserModel) {
    super(userModel);
  }
}
