import { CreateUserDTO } from "../createUserHttpRequest";

export const mockCreateUserDTO = (): CreateUserDTO => {
  return {
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
  };
};
