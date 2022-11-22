import { Success } from "../../core/success";
import { InvalidParamFailure } from "../shared/failures/invalidParamFailure";
import { EmailAlreadyRegisteredFailure } from "../shared/failures/emailAlreadyRegisteredFailure";
import { HttpView } from "../shared/protocols/httpView";
import { HttpViewModel } from "../shared/protocols/HttpViewModel";
import { CreateUserResponseModel } from "./createUserResponseModel";
import { CreateUserPresenter } from "./createUserPresenter";

export class CreateUserHttpPresenter implements CreateUserPresenter {
  constructor(private readonly view: HttpView) {}

  format(response: CreateUserResponseModel): void {
    if (response.constructor === Success) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (
      response.constructor === EmailAlreadyRegisteredFailure ||
      response.constructor === InvalidParamFailure
    ) {
      return this.toView({ statusCode: 400, body: response.error });
    }
  }

  private toView(viewModel: HttpViewModel) {
    return this.view.display(viewModel);
  }
}
