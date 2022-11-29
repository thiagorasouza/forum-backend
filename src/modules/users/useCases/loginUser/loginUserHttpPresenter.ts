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
  }

  private toView(viewModel: HttpViewModel) {
    return this.view.display(viewModel);
  }
}
