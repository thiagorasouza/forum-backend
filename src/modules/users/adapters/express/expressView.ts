import { Response } from "express";
import { CreateUserHttpView } from "../../useCases/createUser/createUserHttpView";
import { CreateUserHttpViewModel } from "../../useCases/createUser/createUserHttpViewModel";

export class ExpressView implements CreateUserHttpView {
  constructor(private readonly res: Response) {}

  display(viewModel: CreateUserHttpViewModel): void {
    this.res.status(viewModel.statusCode);
    this.res.json(viewModel.body);
  }
}
