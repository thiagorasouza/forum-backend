import { Response } from "express";
import { UserHttpView } from "../../useCases/protocols/userHttpView";
import { UserHttpViewModel } from "../../useCases/protocols/userHttpViewModel";

export class ExpressView implements UserHttpView {
  constructor(private readonly res: Response) {}

  display(viewModel: UserHttpViewModel): void {
    this.res.status(viewModel.statusCode);
    this.res.json(viewModel.body);
  }
}
