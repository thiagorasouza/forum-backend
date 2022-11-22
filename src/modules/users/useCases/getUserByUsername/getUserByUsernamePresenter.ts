import { Presenter } from "../shared/protocols/presenter";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameUseCase";

export interface GetUserByUsernamePresenter extends Presenter {
  format(response: GetUserByUsernameResponseModel): void;
}
