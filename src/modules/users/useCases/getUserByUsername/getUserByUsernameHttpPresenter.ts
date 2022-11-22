import { Success } from "../../core/success";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { HttpView } from "../shared/protocols/httpView";
import { HttpViewModel } from "../shared/protocols/httpViewModel";
import { GetUserByUsernamePresenter } from "./getUserByUsernamePresenter";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameResponseModel";

export class GetUserByUsernameHttpPresenter
  implements GetUserByUsernamePresenter
{
  constructor(private readonly view: HttpView) {}

  format(response: GetUserByUsernameResponseModel): void {
    if (response.constructor === Success) {
      return this.toView({ statusCode: 200, body: response.value });
    }
    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 404, body: response.error });
    }
  }

  private toView(viewModel: HttpViewModel) {
    return this.view.display(viewModel);
  }
}
