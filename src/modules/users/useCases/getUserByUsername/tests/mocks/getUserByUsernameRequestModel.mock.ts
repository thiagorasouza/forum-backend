import { GetUserByUsernameRequestModel } from "../../getUserByUsernameUseCase";

export const mockGetUserByUsernameRequestModel =
  (): GetUserByUsernameRequestModel => {
    return {
      username: "validusername",
    };
  };
