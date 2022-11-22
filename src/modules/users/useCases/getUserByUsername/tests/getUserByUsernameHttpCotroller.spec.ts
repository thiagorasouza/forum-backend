import { GetUserByUsernameHttpController } from "../getUserByUsernameHttpCotroller";
import { GetUserByUsernameHttpRequest } from "../getUserByUsernameHttpRequest";
import { GetUserByUsernameUseCase } from "../getUserByUsernameUseCase";
import { mockGetUserByUsernameDTO } from "./getUserByUsernameDTO.mock";
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

    const getUserByUsernameDTO = mockGetUserByUsernameDTO();

    const httpRequest: GetUserByUsernameHttpRequest = {
      body: getUserByUsernameDTO,
    };
    sut.handle(httpRequest);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(getUserByUsernameDTO);
  });
});
