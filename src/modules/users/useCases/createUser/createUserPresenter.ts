import { CreateUserResponseModel } from "./dtos/createUserResponseModel";

export interface CreateUserPresenter {
  execute(response: CreateUserResponseModel): void;
}
