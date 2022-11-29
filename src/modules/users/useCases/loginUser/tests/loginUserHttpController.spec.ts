import { LoginUserHttpController } from "../loginUserHttpController";
import { LoginUserUseCase } from "../loginUserUseCase";
import { mockLoginUserHttpRequest } from "./mocks/loginUserHttpRequest.mock";
import { makeLoginUserUseCase } from "./mocks/loginUserUseCase.mock";

interface SutTypes {
  useCase: LoginUserUseCase;
  sut: LoginUserHttpController;
}

const makeSut = (): SutTypes => {
  const { sut: useCase } = makeLoginUserUseCase();
  const sut = new LoginUserHttpController(useCase);

  return { sut, useCase };
};

describe("LoginUserHttpController Test Suite", () => {
  it("should execute LoginUserUseCase with correct values", () => {
    const { sut, useCase } = makeSut();

    const useCaseSpy = jest.spyOn(useCase, "execute");

    const httpRequest = mockLoginUserHttpRequest();
    sut.handle(httpRequest);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
