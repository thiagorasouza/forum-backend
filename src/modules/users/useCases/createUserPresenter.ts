import { CreateUserResponseModel } from "./createUserResponse";

export interface CreateUserPresenter {
  execute(response: CreateUserResponseModel): void;
}
