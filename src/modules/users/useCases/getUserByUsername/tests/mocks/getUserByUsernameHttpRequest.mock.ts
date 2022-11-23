import { GetUserByUsernameHttpRequest } from "../../getUserByUsernameHttpController";

export const mockGetUserByUsernameHttpRequest =
  (): GetUserByUsernameHttpRequest => ({
    params: {
      username: "anyusername",
    },
  });
