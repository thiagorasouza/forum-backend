import { CreateUserHttpViewModel } from "./createUserHttpViewModel";

export interface CreateUserHttpView {
  display(viewModel: CreateUserHttpViewModel): void;
}
