import { Presenter } from "../shared/protocols/presenter";
import { LoginUserResponseModel } from "./loginUserUseCase";

export interface LoginUserPresenter extends Presenter {
  format(response: LoginUserResponseModel): void;
}
