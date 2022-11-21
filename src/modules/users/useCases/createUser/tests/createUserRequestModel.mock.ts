import { CreateUserRequestModel } from "../createUserRequestModel";

export const mockCreateUserRequestModel = (): CreateUserRequestModel => {
  return {
    name: "valid_name",
    email: "valid_email",
    password: "valid_password",
  };
};
