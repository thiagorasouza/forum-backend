import { HttpViewModel } from "./httpViewModel";

export interface HttpView {
  display(viewModel: HttpViewModel): void;
}
