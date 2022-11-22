import { UserData } from "../userData";

export const mockUserData = (): UserData => {
  return {
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
  };
};
