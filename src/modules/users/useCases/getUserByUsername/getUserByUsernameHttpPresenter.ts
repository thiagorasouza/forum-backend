import { Success } from "../../core/success";
import { UserNotFoundFailure } from "../failures/userNotFoundFailure";
import { UserHttpView } from "../protocols/userHttpView";
import { UserHttpViewModel } from "../protocols/userHttpViewModel";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameResponseModel";

export class GetUserByUsernameHttpPresenter {
  constructor(private readonly view: UserHttpView) {}

  format(response: GetUserByUsernameResponseModel): void {
    if (response.constructor === Success) {
      return this.toView({ statusCode: 200, body: response.value });
    }
    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 400, body: response.error });
    }
  }

  private toView(viewModel: UserHttpViewModel) {
    return this.view.display(viewModel);
  }
}
