import { Success } from "../../core/success";
import { InvalidParamFailure } from "../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "../failures/emailAlreadyRegisteredFailure";
import { UserHttpView } from "../protocols/userHttpView";
import { UserHttpViewModel } from "../protocols/userHttpViewModel";
import { CreateUserResponseModel } from "./createUserResponseModel";

export class CreateUserHttpPresenter {
  constructor(private readonly view: UserHttpView) {}

  format(response: CreateUserResponseModel): void {
    if (response.constructor === Success) {
      return this.toView({ statusCode: 200 });
    }

    if (
      response.constructor === EmailAlreadyRegisteredFailure ||
      response.constructor === InvalidParamFailure
    ) {
      return this.toView({ statusCode: 400, body: response.error });
    }
  }

  private toView(viewModel: UserHttpViewModel) {
    return this.view.display(viewModel);
  }
}
