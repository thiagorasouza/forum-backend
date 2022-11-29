import { InvalidPasswordFailure } from "../shared/failures/invalidPasswordFailure";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { HttpView } from "../shared/protocols/httpView";
import { HttpViewModel } from "../shared/protocols/httpViewModel";
import { UserLoggedInSuccess } from "../shared/successes/userLoggedInSuccess";
import { LoginUserPresenter } from "./loginUserPresenter";
import { LoginUserResponseModel } from "./loginUserUseCase";

export class LoginUserHttpPresenter implements LoginUserPresenter {
  constructor(private readonly view: HttpView) {}

  format(response: LoginUserResponseModel): void {
    if (response.constructor === UserLoggedInSuccess) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 404, body: response.error });
    }

    if (response.constructor === InvalidPasswordFailure) {
      return this.toView({ statusCode: 400, body: response.error });
    }

    if (response.constructor === ServerFailure) {
      return this.toView({ statusCode: 500, body: response.error });
    }
  }

  private toView(viewModel: HttpViewModel) {
    return this.view.display(viewModel);
  }
}
