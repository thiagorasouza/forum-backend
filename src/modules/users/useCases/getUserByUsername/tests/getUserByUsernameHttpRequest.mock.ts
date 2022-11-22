import { GetUserByUsernameHttpRequest } from "../getUserByUsernameHttpRequest";
import { mockGetUserByUsernameDTO } from "./getUserByUsernameDTO.mock";

export const mockGetUserByUsernameHttpRequest =
  (): GetUserByUsernameHttpRequest => {
    return {
      params: mockGetUserByUsernameDTO(),
    };
  };
