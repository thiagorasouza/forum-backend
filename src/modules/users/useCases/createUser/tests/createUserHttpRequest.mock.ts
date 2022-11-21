import { CreateUserHttpRequest } from "../createUserHttpRequest";

export const mockCreateUserHttpRequest = (): CreateUserHttpRequest => {
  return {
    body: {
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    },
  };
};
