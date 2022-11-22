import { CreateUserDTO } from "../createUserHttpRequest";

export const mockCreateUserDTO = (): CreateUserDTO => {
  return {
    username: "anyusername",
    email: "any_email@email.com",
    password: "any_password",
  };
};
