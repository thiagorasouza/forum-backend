import { HttpViewModel } from "./HttpViewModel";

export interface HttpView {
  display(viewModel: HttpViewModel): void;
}
