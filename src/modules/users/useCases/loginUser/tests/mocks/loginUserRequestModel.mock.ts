import { LoginUserRequestModel } from "../../loginUserUseCase";

export const mockLoginUserRequestModel = (): LoginUserRequestModel => ({
  email: "any_email@email.com",
  password: "any_password",
});
