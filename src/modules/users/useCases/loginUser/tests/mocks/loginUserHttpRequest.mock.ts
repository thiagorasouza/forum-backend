import { LoginUserHttpRequest } from "../../loginUserHttpController";

export const mockLoginUserHttpRequest = (): LoginUserHttpRequest => ({
  body: {
    email: "any_email@email.com",
    password: "any_password",
  },
});
