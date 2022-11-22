import { GetUserByUsernameHttpRequest } from "../../getUserByUsernameHttpCotroller";

export const mockGetUserByUsernameHttpRequest =
  (): GetUserByUsernameHttpRequest => ({
    params: {
      username: "anyusername",
    },
  });
