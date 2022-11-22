import { Response } from "express";
import { HttpView } from "../../useCases/shared/protocols/httpView";
import { HttpViewModel } from "../../useCases/shared/protocols/HttpViewModel";

export class ExpressView implements HttpView {
  constructor(private readonly res: Response) {}

  display(viewModel: HttpViewModel): void {
    this.res.status(viewModel.statusCode);
    this.res.json(viewModel.body);
  }
}
