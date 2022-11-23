import { EmailAlreadyRegisteredFailure } from "../shared/failures/emailAlreadyRegisteredFailure";
import { InvalidParamFailure } from "../shared/failures/invalidParamFailure";
import { ServerFailure } from "../shared/failures/serverFailure";
import { HttpView } from "../shared/protocols/httpView";
import { HttpViewModel } from "../shared/protocols/httpViewModel";
import { UserCreatedSuccess } from "../shared/successes/userCreatedSuccess";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserResponseModel } from "./createUserUseCase";

export class CreateUserHttpPresenter implements CreateUserPresenter {
  constructor(private readonly view: HttpView) {}

  format(response: CreateUserResponseModel): void {
    if (response.constructor === UserCreatedSuccess) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (
      response.constructor === EmailAlreadyRegisteredFailure ||
      response.constructor === InvalidParamFailure
    ) {
      return this.toView({ statusCode: 400, body: response.error });
    }

    if (response.constructor === ServerFailure) {
      return this.toView({ statusCode: 500, body: response.error });
    }
  }

  private toView(viewModel: HttpViewModel) {
    // console.log("🚀 ~ viewModel", viewModel);
    return this.view.display(viewModel);
  }
}
