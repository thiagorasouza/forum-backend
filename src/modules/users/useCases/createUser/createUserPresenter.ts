import { Presenter } from "../shared/protocols/presenter";
import { CreateUserResponseModel } from "./createUserUseCase";

export interface CreateUserPresenter extends Presenter {
  format(response: CreateUserResponseModel): void;
}
