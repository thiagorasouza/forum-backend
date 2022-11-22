import { Presenter } from "../shared/protocols/presenter";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameResponseModel";

export interface GetUserByUsernamePresenter extends Presenter {
  format(response: GetUserByUsernameResponseModel): void;
}
