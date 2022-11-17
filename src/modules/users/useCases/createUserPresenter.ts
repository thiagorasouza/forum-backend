import { CreateUserResponse } from "./createUserResponse";

export interface CreateUserPresenter {
  execute(response: CreateUserResponse): void;
}
