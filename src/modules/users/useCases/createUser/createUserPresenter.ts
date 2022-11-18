import { CreateUserResponseModel } from "./createUserResponseModel";

export interface CreateUserPresenter {
  execute(response: CreateUserResponseModel): void;
}
