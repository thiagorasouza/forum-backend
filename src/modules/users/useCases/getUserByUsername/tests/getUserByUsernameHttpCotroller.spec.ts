import { GetUserByUsernameHttpController } from "../getUserByUsernameHttpCotroller";
import { GetUserByUsernameUseCase } from "../getUserByUsernameUseCase";
import { mockGetUserByUsernameHttpRequest } from "./getUserByUsernameHttpRequest.mock";
import { mockGetUserByUsernameUseCase } from "./getUserByUsernameUseCase.mock";

interface SutTypes {
  useCase: GetUserByUsernameUseCase;
  sut: GetUserByUsernameHttpController;
}

const makeSut = (): SutTypes => {
  const { sut: useCase } = mockGetUserByUsernameUseCase();
  const sut = new GetUserByUsernameHttpController(useCase);

  return { sut, useCase };
};

describe("GetUserByUsernameHttpController Test Suite", () => {
  it("should execute GetUserByUsernameUseCase with correct values", () => {
    const { sut, useCase } = makeSut();

    const useCaseSpy = jest.spyOn(useCase, "execute");

    const httpRequest = mockGetUserByUsernameHttpRequest();
    sut.handle(httpRequest);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(httpRequest.params);
  });
});
