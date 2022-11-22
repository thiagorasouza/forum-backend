import { Success } from "../../core/success";
import { CreateUserPresenter } from "../createUser/createUserPresenter";
import { CreateUserResponseModel } from "../createUser/createUserResponseModel";
import { GetUserByUsernamePresenter } from "../getUserByUsername/getUserByUsernamePresenter";
import { GetUserByUsernameResponseModel } from "../getUserByUsername/getUserByUsernameResponseModel";
import { EmailAlreadyRegisteredFailure } from "./failures/emailAlreadyRegisteredFailure";
import { InvalidParamFailure } from "./failures/invalidParamFailure";
import { UserNotFoundFailure } from "./failures/userNotFoundFailure";
import { HttpView } from "./protocols/httpView";
import { HttpViewModel } from "./protocols/httpViewModel";

type ResponseModels = CreateUserResponseModel | GetUserByUsernameResponseModel;

export class HttpPresenter
  implements CreateUserPresenter, GetUserByUsernamePresenter
{
  constructor(private readonly view: HttpView) {}

  format(response: ResponseModels): void {
    if (response.constructor === Success) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (
      response.constructor === EmailAlreadyRegisteredFailure ||
      response.constructor === InvalidParamFailure
    ) {
      return this.toView({ statusCode: 400, body: response.error });
    }

    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 404, body: response.error });
    }
  }

  private toView(viewModel: HttpViewModel) {
    return this.view.display(viewModel);
  }
}
