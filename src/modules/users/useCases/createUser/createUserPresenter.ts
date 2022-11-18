import { CreateUserResponseModel } from "./createUserResponseModel";

export interface CreateUserPresenter {
  format(response: CreateUserResponseModel): void;
}
