import { InvalidParamFailure } from "../shared/failures/invalidParamFailure";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { HttpView } from "../shared/protocols/httpView";
import { HttpViewModel } from "../shared/protocols/httpViewModel";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";
import { GetUserByUsernamePresenter } from "./getUserByUsernamePresenter";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameUseCase";

export class GetUserByUsernameHttpPresenter
  implements GetUserByUsernamePresenter
{
  constructor(private readonly view: HttpView) {}

  format(response: GetUserByUsernameResponseModel): void {
    if (response.constructor === UserFoundSuccess) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 404, body: response.error });
    }

    if (response.constructor === InvalidParamFailure) {
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
