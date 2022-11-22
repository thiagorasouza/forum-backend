import { CreateUserRequestModel } from "../createUserRequestModel";

export const mockCreateUserRequestModel = (): CreateUserRequestModel => {
  return {
    username: "valid_username",
    email: "valid_email",
    password: "valid_password",
  };
};
