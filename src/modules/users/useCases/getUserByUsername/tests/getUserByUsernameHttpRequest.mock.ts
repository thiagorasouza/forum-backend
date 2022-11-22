import { GetUserByUsernameHttpRequest } from "../getUserByUsernameHttpRequest";

export const mockGetUserByUsernameHttpRequest =
  (): GetUserByUsernameHttpRequest => ({
    params: {
      username: "anyusername",
    },
  });
