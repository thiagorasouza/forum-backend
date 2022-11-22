import { CreateUserHttpRequest } from "../createUserHttpRequest";
import { mockCreateUserDTO } from "./createUserDTO.mock";

export const mockCreateUserHttpRequest = (): CreateUserHttpRequest => {
  return {
    body: mockCreateUserDTO(),
  };
};
