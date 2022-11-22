import { CreateUserHttpRequest } from "../../createUserHttpController";

export const mockCreateUserHttpRequest = (): CreateUserHttpRequest => ({
  body: {
    username: "anyusername",
    email: "any_email@email.com",
    password: "any_password",
  },
});
