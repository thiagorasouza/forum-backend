import { CreateUserRequestModel } from "../../createUserUseCase";

export const mockCreateUserRequestModel = (): CreateUserRequestModel => {
  return {
    username: "valid_username",
    email: "valid_email",
    password: "valid_password",
  };
};
