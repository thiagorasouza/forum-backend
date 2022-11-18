import { Success } from "../../core/success";
import { InvalidParamFailure } from "../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "./createUserFailures";
import { CreateUserHttpView } from "./createUserHttpView";
import { CreateUserHttpViewModel } from "./createUserHttpViewModel";
import { CreateUserResponseModel } from "./createUserResponseModel";

export class CreateUserHttpPresenter {
  constructor(private readonly view: CreateUserHttpView) {}

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

  private toView(viewModel: CreateUserHttpViewModel) {
    this.view.display(viewModel);
  }
}
