import { Success } from "../../core/success";
import { CreateUserHttpView } from "./createUserHttpView";
import { CreateUserHttpViewModel } from "./createUserHttpViewModel";
import { CreateUserResponseModel } from "./createUserResponseModel";

export class CreateUserHttpPresenter {
  constructor(private readonly view: CreateUserHttpView) {}

  format(response: CreateUserResponseModel): void {
    switch (response.constructor) {
      case Success:
        return this.toView({ statusCode: 200 });
    }
  }

  private toView(viewModel: CreateUserHttpViewModel) {
    this.view.display(viewModel);
  }
}
