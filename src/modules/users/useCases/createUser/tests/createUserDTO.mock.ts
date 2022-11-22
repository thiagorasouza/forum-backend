import { CreateUserDTO } from "../createUserHttpRequest";

export const mockCreateUserDTO = (): CreateUserDTO => {
  return {
    username: "any_username",
    email: "any_email@email.com",
    password: "any_password",
  };
};
