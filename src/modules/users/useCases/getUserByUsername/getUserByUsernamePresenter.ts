import { GetUserByUsernameResponseModel } from "./getUserByUsernameResponseModel";

export interface GetUserByUsernamePresenter {
  format(response: GetUserByUsernameResponseModel): void;
}
