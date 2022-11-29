import { UserData } from "../../userData";

export const mockUserData = (): UserData => {
  return {
    username: "anyusername",
    email: "any_email@email.com",
    password: "any_password",
  };
};

export const mockUserDataWithId = (): UserData => {
  return {
    id: "any_id",
    username: "anyusername",
    email: "any_email@email.com",
    password: "any_password",
  };
};
