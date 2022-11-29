import { LoginUserUseCase } from "../../loginUserUseCase";

interface SutTypes {
  sut: LoginUserUseCase;
}

export const makeLoginUserUseCase = (): SutTypes => {
  const sut = new LoginUserUseCase();
  return { sut };
};
