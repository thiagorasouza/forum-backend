import { UserHttpViewModel } from "./userHttpViewModel";

export interface UserHttpView {
  display(viewModel: UserHttpViewModel): void;
}
