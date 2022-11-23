import { Failure } from "../../core/failure";
import { Success } from "../../core/success";
import { CreateUserPresenter } from "../createUser/createUserPresenter";
import { CreateUserResponseModel } from "../createUser/createUserUseCase";
import { GetUserByUsernamePresenter } from "../getUserByUsername/getUserByUsernamePresenter";
import { GetUserByUsernameResponseModel } from "../getUserByUsername/getUserByUsernameUseCase";
import { EmailAlreadyRegisteredFailure } from "./failures/emailAlreadyRegisteredFailure";
import { InvalidParamFailure } from "./failures/invalidParamFailure";
import { MissingParamFailure } from "./failures/missingParamFailure";
import { UserNotFoundFailure } from "./failures/userNotFoundFailure";
import { HttpView } from "./protocols/httpView";
import { HttpViewModel } from "./protocols/httpViewModel";

type ResponseModels = CreateUserResponseModel | GetUserByUsernameResponseModel;

export class HttpPresenter
  implements CreateUserPresenter, GetUserByUsernamePresenter
{
  constructor(private readonly view: HttpView) {}

  format(response: ResponseModels): void {
    if (response instanceof Success) {
      return this.toView({ statusCode: 200, body: response.value });
    }

    if (response.constructor === UserNotFoundFailure) {
      return this.toView({ statusCode: 404, body: response.error });
    }

    if (
      response.constructor === EmailAlreadyRegisteredFailure ||
      response.constructor === InvalidParamFailure ||
      response.constructor === MissingParamFailure
    ) {
      return this.toView({ statusCode: 400, body: response.error });
    }

    return this.toView({ statusCode: 500, body: response.error });
  }

  private toView(viewModel: HttpViewModel) {
    // console.log("🚀 ~ viewModel", viewModel);
    return this.view.display(viewModel);
  }
}
