import { Presenter } from "../shared/protocols/presenter";
import { CreateUserResponseModel } from "./createUserResponseModel";

export interface CreateUserPresenter extends Presenter {
  format(response: CreateUserResponseModel): void;
}
