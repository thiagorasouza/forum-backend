// import { CreateUserDTO } from "../createUserHttpRequest";

import { GetUserByUsernameDTO } from "../getUserByUsernameHttpRequest";

export const mockGetUserByUsernameDTO = (): GetUserByUsernameDTO => {
  return {
    username: "any_username",
  };
};
